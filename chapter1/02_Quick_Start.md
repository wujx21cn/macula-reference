# 快速开始

本章将通过macula-samples的创建过程介绍通过Macula平台开发业务系统的整个过程，对于其中的部分代码内容，将不做过多介绍。

## 2.1 环境准备


##2.2 环境配置


    
##2.3 项目的导入



## 2.4 新建业务项目



## 2.5 创建业务父模块



## 2.6 创建业务子模块



## 2.7 Webapp模块修改



## 2.8 打包



## 2.9 程序开发

### 2.9.1 概要介绍



### 2.9.2 Domain 和 DAO 层





### 2.9.3 Service 层


### 2.9.4 Controller 层


###2.9.5 页面层



### 2.9.6 开发技巧汇总


#### 2.9.6.1 通过 jQuery 提交表单并获得返回结果

做 Web 程序开发经常遇到的一个问题是提交表单后显示操作结果，按照传统做法是额外增加一个显示结果的 Web 页面，这个方法增加了开发工作量，而且额外增加了一个以后需要维护的文件。

还有个常用的方法是继续使用当前的页面，把返回信息显示在当前页面表单的上方。但这样需要重新刷新当前页面，而且还要把已经输入的各个数据重新放置到各输入框中，对于一些复杂的像下拉框输入，还要涉及重新取下拉框数据，实现比较麻烦而且对性能有影响。

我们可以用 jQuery 来实现这个处理，并且根据提交的返回信息直接在页面端用 JavaScript 显示出来，不需要刷新页面，也不需要增加额外的文件，很方便。下面我就讲解一下实现方法。

下面这个例子是用于实现修改密码的功能，用户输入旧密码和新密码后提交，服务器端要判断旧密码是否跟数据库中的一致，如果不一致就显示错误信息。如果没有错误信息返回就说明修改成功，页面就显示修改成功的信息。

先看 .ftl 页面文件对表单的定义：

```html
<@ui.panel_head>
	<div class="col-xs-12 col-md-12">
		<a id="save-action-${code}" class="btn btn-primary">
			<i class="fa fa-check-circle fa-lg"></i>
			保存
		</a>
		<a id="cancel-action-${code}" class="btn btn-default" data-toggle="popBreadcrumb">
			<i class="fa fa-reply fa-lg"></i>
			关闭
		</a>
	</div>
</@ui.panel_head>
<@ui.panel_body>
    <form id="form-${code}" action="${base}/admin/macula-uim/user/savepassword" method="post" class="form-horizontal" rel="validate-form" data-bv-container="tooltip">
    	<div class="form-body">
    		<div class="row">
    	        <div class="col-md-12">
    	           <div class="form-group">
    	               <label class="control-label col-md-3">用户名：</label>
    	               <div class="col-md-9">
    	                   <input type="text"  name="username"  class="form-control input-sm" required maxlength="50"/>
    	               </div>
    	           </div>
    	        </div>
    		 </div>
    		<div class="row">
    	        <div class="col-md-12">
    	           <div class="form-group">
    	               <label class="control-label col-md-3">旧密码：</label>
    	               <div class="col-md-9">
    	                   <input type="password"  name="oldpassword"  class="form-control input-sm" required maxlength="50"/>
    	               </div>
    	           </div>
    	        </div>
    		 </div>	
    		<div class="row">
    	        <div class="col-md-12">
    	           <div class="form-group">
    	               <label class="control-label col-md-3">新密码：</label>
    	               <div class="col-md-9">
    	                   <input type="password"  name="newpassword"  class="form-control input-sm" required maxlength="50"/>
    	               </div>
    	           </div>
    	        </div>
    		 </div>
    		<div class="row">
    	        <div class="col-md-12">
    	           <div class="form-group">
    	               <label class="control-label col-md-3">再次输入新密码：</label>
    	               <div class="col-md-9">
    	                   <input type="password"  name="reNewpassword"  class="form-control input-sm" required maxlength="50"/>
    	               </div>
    	           </div>
    	        </div>
    		 </div>
    	</div>
    </form>
</@ui.panel_body>
```

上面定义了一个表格样子的 form。

然后看一下 .js 文件的内容：

```javascript
$('#save-action-' + code).click(function(e) {
	$form.ajaxValidSubmit({
		success : function(data) {
		    if (data.success) {
			    MessageBox.success('保存成功');
			}else {
			    if( data.exceptionMessage ) {
			        AlertBox.error(data.exceptionMessage);
			    }
			}
		},
		error : function(data) {
		}
	});
});

```

上面是把表单提交的处理绑定到一个方法，方式是采用 AJAX 的方式提交表单，然后根据提交结果显示不同信息。返回结果 data 是一个 JSON 对象，属性 data.success 是判断操作是否成功，说明操作完成而且没有抛出异常。如果有错误返回那 data.success 就是 false，通过 data.exceptionMessage 就可以显示出错误信息。

下面我们再看一下服务器端的处理。

Controller 的代码是：

```java
@RequestMapping(value = "/user/savepassword", method = RequestMethod.POST)
@OpenApi
public Long savePassword(@RequestParam("username") String username, 
						 @RequestParam("oldpassword") String oldPassword,
						 @RequestParam("newpassword") String newPassword) {
	
	return userManagerService.changePassword(username, oldPassword, newPassword);
}
```

这个看起来很简单，调用了 Service 的一个方法。

再看 Service 代码：

```java
@Override
@Transactional
public Long changePassword(String username, String oldPassword, String newPassword)
{
	JpaUIMUser user = uimUserRepository.findByUserName(username);
	
	if (user == null)
	{
		throw new UIMException("macula.uim.user.changePwds.invalidUserName");
	}
	
	//if the old password is different from the submitted password, will throw an exception
	if ( !user.getPassword().equals(getPasswordEncoder().encodePassword(oldPassword,null)) )
	{
		throw new UIMException("macula.uim.user.changePwds.invalidOldPassword");
	}
	
	user.setPassword(getPasswordEncoder().encodePassword(newPassword, null));
	
	uimUserRepository.save(user);
	
	return user.getId();
}
```

上面代码我们可以看出，在检查数据出现问题的时候就抛出异常 UIMException，异常的参数是一个 Message 的 Code，比如 macula.uim.user.changePwds.invalidUserName 是在程序所在资源包的 src/main/resources/i18n 下对应的几个 messages.properties 文件里定义的，针对每种语言定义一个 Message Code，以及对应的信息。

在抛出异常的时候 Macula 框架会捕获并且读取到对应的错误信息，并且创建一个返回对象，返回对象会包裹返回值和错误信息。

页面端会以 JSON 的方式获取到服务器端返回的对象，然后进行结果判断，并且显示对应的信息。

#### 2.9.6.2 如何做下拉框输入功能

下拉框是我们开发Web应用经常需要用到的，下面我讲解一下 Macula 框架中如何实现下拉框功能。

我们需要先在数据库中一个统一的表中定义好下拉框的数据，有 Value 和 Label。数据可以是常量也可以是从其他表中获取的，数据库表的名字是：MA_BASE_DATA_PARAM，里面关键的几个字段是 CODE、NAME和VALUE，其他字段数据可以参照已有记录。

示例分别如下：

**1.常量下拉框数据定义**

```
CODE：language
NAME：语言
VALUE：1:中文|2:英文
```

上面就定义了一个下拉框的数据，是语言选择的，有两个数据，一个是中文，另一个是英文，对应的数据值分别是 1 和 2。

**2.动态下拉框数据定义**

```
CODE：datasource_list
NAME：数据源列表
VALUE：select name as label, id as code from ma_base_data_source
```

上面例子定义了一个动态下拉框数据，关键是 VALUE 字段的 SQL 语句，需要有 code 和 label 两个字段名，以 as 的方式把其他字段名转为 code 和 label。

在页面上使用示例如下：

```html
<select name="dataParam.dataSourceId" data-bind="options: dataSourceIdParams.datasource_list, optionsText: 'label', optionsValue:'id', optionsCaption: '无',value: 'NONE'" class="chosen-select form-control"/>
```

我们需要使用由 Macula 框架定义的 freemarker 宏 writeDataParamsJs 从后台获得下拉框数据，赋给javscript中的变量，然后采用 data-bind 的方式把下拉框数据填充到下拉框里。因此我们需要在 .ftl 文件中增加以下代码。

```html
<script type="text/javascript">
	var dataSourceIdParams={<@macula.writeDataParamsJs 'datasource_list' />};
</script>
```

#### 2.9.6.3 如何做 Checkbox 输入功能

用我们框架实现Checkbox 功能有点小技巧，需要用到额外的一个 hidden 字段用于保存 Checkbox 的值。实现示例如下：

```html
<input type="hidden" name="user.enabled" data-bind="value: enabled, type: 'boolean' " />
<input type="checkbox" data-bind="checked: enabled" />
```

页面上显示的是 Checkbox，它跟页面 model 中的 enabled 属性绑定，还有一个 hidden 字段也是跟 enabled 属性对应，而且定义它的 type 是 boolean。

如果没有那个 hidden 字段那我们选择 Checkbox 的值就无法保存到服务器端，主要是因为我们在 Domain 层定义的 enabled 属性是 Boolean 类型，而页面里的 Checkbox 可以是任意值，所以需要一点额外的转换处理。

#### 2.9.6.4 如何做 Radio 输入功能

Radio 输入功能相对 Checkbox 就很容易实现，因为 Radio 控件对应的数据值是直接保存到数据库中的，不需要做额外的转换处理。示例如下：

```html
<input type="radio" name="user.sex" value="M" data-bind="checked: sex"/>男
<input type="radio" name="user.sex" value="F" data-bind="checked: sex"/>女
```

上面就实现了两个 Radio，都绑定页面 Model 上的 sex 属性，每个 Radio 对应的 Value 是不同的，根据选择不同在服务器端保存的值也不同。

#### 2.9.6.5 使用日期输入控件

日期时间输入控件具体可以参考 Macula UI 的官方文档：

[Macula UI 日期时间控件部分](http://macula.top/mower/javascript.html#datetimepicker)

下面我们给出一个日期+时间选择的例子：

```html
<div class="form-group">
    <div class='input-group date datetimepicker-all'>
        <input type='text' class="form-control" />
        <span class="input-group-addon">
            <span class="glyphicon glyphicon-time"></span>
        </span>
    </div>
</div>

<script type="text/javascript">
// 选择时间和日期
$(".datetimepicker-all").datetimepicker(
{
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    forceParse: 0,
    showMeridian: 1,
    format: "yyyy-mm-dd hh:ii"
});
</script>
```

