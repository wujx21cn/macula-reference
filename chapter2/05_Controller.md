# 展示层

在Macula开发平台下，建议使用Spring MVC + Freemarker的方式来实现展现层。

同时对于Ajax部分，在javascript框架中建议使用jquery框架。

## 8.1 地址规划

对于当前大部分的业务系统，存在终端使用和后台管理的情况以及未来对于F5在地址分发方面的合理性布局，在地址规划上，需要按一定的规则进行：

* /admin/ ：如果该功能是一个后台管理功能，则需要在地址前端加入/admin/
* /front/：如果该功能是一个用户使用功能，则需要在地址前端加入/front/
* /模块名/：针对macula平台开发的需要，每个模块都必须有自己的地址命名空间，对于该部分的命名，需要在模块定义规划时指定（具体的模块命名可能需要进行流程方面的审批）。
* /功能名称/：针对模块下的某一功能，需要给出功能的名称。
* /操作名称/：针对某一功能下具体的操作，需要给出操作的名称，如index,new,edit,save,read,delete,query等动词。

所以最终的地址命名为：

* 管理功能：/admin/模块名/功能名/操作名称/参数/其他
* 用户功能：/front/模块名/功能名/操作名称/参数/其他


## 8.2. 请求方式规划

为了保证业务系统不被重复的请求以及不正确的请求干扰，对于请求方式做如下规划：

* 对于获取单条数据或显示新增与编辑页面的方式可以使用GET请求
* 对于删除数据、保存数据或提交多条数据给后台的应该使用POST方式
* 有多个查询条件的查询功能应该使用POST方式

## 8.3 REST

在对REST的支持方面，使用Spring的REST解决方案，macula平台未做相关变动，这里说明在能使用REST的方式下，尽量使用REST方式。

在Macula平台开发中，将不通过地址中的参数来传递参数值，而直接通过地址信息来传递参数值。

如请求的地址：/admin/macula-uim/user/delete/user1 可通过Controller中定义

```
@RequestMapping(value = "/admin/macula-uim/user/delete/{userName}", method = RequestMethod.DELETE)

@OpenApi

public ExecuteResponse delete(@PathVariable String userName) {

    //do something

}

```

## 8.4 REST数据返回格式

为了未来能够将目前的Controller请求方法开放给其他终端使用，有必要对Controller的返回值做一个统一的规划，如下：

```
public class Response {

	/** 是否成功标识 */
	private boolean success;

	/** 系统级错误代码 */
	private String errorCode;
	/** 系统级错误信息 */
	private String errorMessage;

	/** 业务级错误代码 */
	private String exceptionCode;
	/** 业务级错误信息 */
	private String exceptionMessage;

	/** 异常详细信息 */
	private String exceptionStack;
	/** 服务端重定向信息 */
	private String redirection;

	/** 校验结果信息 */
	private List<FieldError> validateErrors;

	public Response() {
		this.success = true;
	}

	public Response(MaculaException exception) {
		this.success = false;
		this.errorCode = exception.getParentCode();
		this.errorMessage = ApplicationContext.getMessage(errorMessage);
		this.exceptionCode = exception.getMessage();
		this.exceptionMessage = exception.getLocalizedMessage();
		this.exceptionStack = exception.getFullStackMessage();

		if (exception instanceof FormBindException) {
			List<FieldError> fieldErrors = ((FormBindException) exception).getFieldErrors();
			for (FieldError fieldError : fieldErrors) {
				this.addValidateError(fieldError);
			}
		}
	}
}         
```

```
public class ExecuteResponse<T> extends Response {

	/** 结果信息 */
	private final T returnObject;

	public ExecuteResponse(T result) {
		this.returnObject = result;
	}

	/**
	 * @return the result
	 */
	public T getReturnObject() {
		return returnObject;
	}

}
```

```
public class PageResponse extends Response {

	/** 本次请求的记录数 */
	private final int size;
	
	/** 当前页码，从零开始 */
	private final int number;
	
	/** 总记录数 */
	private final long totalElements;
	
	/** 总页数 */
	private final int totalPages;
	
	/** 本页的总记录数 */
	private final int numberOfElements;
	
	/** 是否首页 */
	private final boolean firstPage;
	
	/** 是否最后页 */
	private final boolean lastPage;
	
	/** 内容列表 */
	private final List<?> content;

	public PageResponse(Page<?> page) {
		this.size = page.getSize();
		this.number = page.getNumber();
		this.totalElements = page.getTotalElements();
		this.totalPages = page.getTotalPages();
		this.numberOfElements = page.getNumberOfElements();
		this.firstPage = page.isFirstPage();
		this.lastPage = page.isLastPage();
		this.content = page.getContent();
	}
}
```

上述代码中，Response类是基类，出现异常时会构造Response类型返回，ExecuteResponse主要用在单记录数据的返回，PageResponse则用于需要返回列表数据的情况。

***重要***

*为了减少对编程的干扰，正常情况下，Controller中的方法可以仍然按照Service接口中的方法的返回值正常返回数据，对于原使用@ResponseBody注解的方法，如果需要，则通过使用@OpenApi注解来自动处理对应的返回值，默认情况下，采用@OpenApi 注解后，非Response、Map、Model等类型的返回值，会被包裹成ExecuteResponse，而Page<?>返回值会被包裹成PageResponse。*


@OpenApi注解的启用需要配置RequestMappingHandlerAdapter的customReturnValueHandlers属性：

```
<property name="customReturnValueHandlers">
    <list>
        <bean class="org.macula.core.mvc.OpenApiReturnValueHandler">
            <constructor-arg ref="messageConverters"/>              
        </bean>
    </list>
</property>
```

## 8.5 国际化

国际化 可分为页面国际化和提示信息国际化。

页面国际化可以通过多个Freemarker文件解决，通过不同的国际化后缀来区分不同地区的页面；比如：index.ftl，如果要添加一个英文页面，可以添加index_en_US.ftl，这样当英文国家的用户访问系统时，将最先使用index_en_US.ftl文件。

提示信息国际化使用资源文件处理，在每个模块的资源文件目录下，都有i18n/xxxx/messages_xx_XX.properties等众多资源文件，同时添加到applicationContext-macula.xml配置文件中。

## 8.6 表单校验

在Controller中的参数中，使用@FormBean注解来绑定页面数据到Domain，如果转换失败，则失败结果会出现在BindingResult中

在Controller中的参数中，使用@Valid注解来检查页面数据到Domain数据是否符合校验规则，校验规则的定义是在Domain中完成的，采用JSR-303的Bean Validator标准定义。校验失败的结果同样保存在BindingResult中

失败结果可以通过BaseController中的getMergedBindingResults方法得到，具体使用请参考BaseController类的使用说明。

## 8.7 使用基类Controller

在展示层编写的Controller实现，需要直接或间接扩展至BaseController

```
@RequestMapping("admin/macula-base")

public class AdminMaculaBaseController extends BaseController {

    //something

}
```

在BaseController中处理了大量的异常处理方式以及数据返回要求的设定。


## 8.8 参数绑定校验

在Spring MVC默认的基础上，Macula开发平台在参数绑定上做了适当扩展，以适应与Struts（Webwork）等相同的对参数处理的一致性，具体来说，有如下的变化：

1. Bean参数绑定
    
    默认情况下，String MVC对参数的绑定方式，采用直接属性名与给定POJO属性名相同的方式实现绑定，为了更好的区分具体的参数信息，Macula平台扩展了这类绑定，允许
    
    ```
    pojo名+ . + 属性名
    ```
    的方式绑定。
    
    **例 8.1. 两种绑定的区别**
    
    比如在Controller中，会返回的用户信息保存，其Controller原型为：
    
    ```
    public User save(User user){

    // something

    return user;

    }
    ```
    
    此时客户端提交的参数信息为：
    
    ```
    ?userName=Wilson&password=123456
    ```
    
    此时Spring将自动将userName和password绑定生成User对象。但这种方式在返回多个对象时不太适用，所以Macula平台通过扩展，可通过修改Controller中的原型为：
    
    ```
    public User save(@Valid @FormBean("user") User user){

    if (hasErrors()) {
        throw new FormBindException(getMergedBindingResults());
    }

    // something
    return user;

    }
    ```
    
    通过Macula平台扩展后的提交的数据格式，将可以通过下面提交方式绑定：
    
    
    

