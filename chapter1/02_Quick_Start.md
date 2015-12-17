# 快速开始

本章将通过macula-samples的创建过程介绍通过Macula平台开发业务系统的整个过程，对于其中的部分代码内容，将不做过多介绍。

## 2.1 环境准备
“工欲善其事，必先利其器”，在开始介绍之前，我们需要准备相应的环境。

*   **Java SDK**

    Macula平台要求使用Java SDK的版本为1.6以上。
    
*   **Tomcat**

    选择Tomcat6.0以上版本。
    
*   **Eclipse**

    可选择最新的Eclipse 3.6.2版本，在Eclipse的多个发布版本中，选择Eclipse IDE for Java EE Developers，该版本包含了可部署的J2EE服务器适配。
    
*   **Maven-Eclipse插件**

    Maven插件： http://download.eclipse.org/technology/m2e/releases
    
    Maven-Wtp插件：在安装了上面的插件后，在Preference->Maven ->Discovery中，选择WTP插件安装。
    
*   **svn-Eclipse插件**

    SVN插件：http://subclipse.tigris.org/update_1.6.x/
    
*   **数据库（Oracle）**

    准备运行时需要的数据库资源。
另外，为了方便开发Freemarker模版等，可加入Freemarker IDE插件等，为了增强代码的健壮性，可加入FindBugs、CheckStyle等Eclipse插件。

##2.2 环境配置

* **文件编码设置**

    Macula平台要求使用UTF-8的文件编码格式，可通过Eclipse -> Preference -> General -> Workspace 中，设定Text file encoding的方式设置项目环境为UTF-8编码。
    
    ![tutorials-eclipse-workspace.jpg](tutorials-eclipse-workspace.jpg "tutorials-eclipse-workspace.jpg")
    
* **服务器设置**

    业务系统最终需要在J2EE容器中运行，这里选择Tomcat6.0作为服务器容器，在Eclipse中，需要进行相关配置。

    通过Eclipse -> Preference -> Server -> Runtime Envionment选取增加Apache Tomcat6.0服务：   
    
    ![tutorials-eclipse-server.jpg](tutorials-eclipse-server.jpg "tutorials-eclipse-server.jpg")
    
    ![tutorials-eclipse-tomcat.jpg](tutorials-eclipse-tomcat.jpg "tutorials-eclipse-tomcat.jpg")
    
##2.3 项目的导入

以macula-samples为例，macula-samples采用svn+maven进行基础的代码管理与开发，下面通过maven平台自身的项目导入，来介绍已有项目的导入。

可通过svn下载macula平台代码（如放置在D:\workspace\macula-samples目录），然后通过Eclipse导入的方式将macula平台的代码导入。

导入方式为，选择File->Import->Maven->Existing Maven Projects的方式：

![tutorials-maven-import.jpg](tutorials-maven-import.jpg "tutorials-maven-import.jpg")

![tutorials-maven-import2.jpg](tutorials-maven-import2.jpg "tutorials-maven-import2.jpg")

通过这种方式，可导入macula平台的所有子模块。

## 2.4 新建业务项目

通过Eclipse的新建Maven向导来创建新的业务工程项目。

![tutorials-maven-newwizard.jpg](tutorials-maven-newwizard.jpg "tutorials-maven-newwizard.jpg")

在下一步中，可选择pom模块、jar模块或war，在新项目创建时，请选择pom模块的方式，创建项目根，其他模块以子模块的方式存在。

为创建一个pom模块的pom.xml，可以在向导中选择maven-archetype-site来创建。

![tutorials-maven-newwizard2.jpg](tutorials-maven-newwizard2.jpg "tutorials-maven-newwizard2.jpg")

从而可以得到一个项目的根目录，在这个项目跟目录中，用来处理打包、发布等，均写在该pom.xml中，具体可参考macula工程根下的pom.xml文件。

## 2.5 创建业务父模块

在创建了项目根后，我们并没有创建任何的项目模块，为了保证项目能使用一致的设置，需要创建项目业务模块的父模块，用XX-parent来命名，比如macula开发平台下的macula-parent，就是用来定义项目模块的父模块设置的。

创建的父模块作为根模块的子模块存在，与下一节介绍的业务子模块一样，都是通过打开根pom.xml，然后在图形化界面中，选择modules下的Create按钮来创建的。

在该父模块中，主要设置maven仓库地址，编译的jdk级别，使用的第三方库以及版本等，相关的信息可以参考macula-parent中的配置信息。

基于Macula平台开发中，只需要依赖macula-base即可。

## 2.6 创建业务子模块

设置了项目一致性的依赖、项目版本以及编译环境后，可通过maven插件打开跟目录下的pom.xml，在该界面中增加业务子模块。

以macula-samples为例，可以看出最终创建的子模块如下图所示：

![tutorials-maven-modules.jpg](tutorials-maven-modules.jpg "tutorials-maven-modules.jpg")

其创建过程为通过点击Modules下的Create按钮，逐一创建子模块。

在创建子模块时，选择Parent-Project为上面创建的父模块。如创建macula-samples下的子模块macula-samples-demo时，需要选择macula-samples-parent作为Parent Project。

![tutorials-maven-newmodule.jpg](tutorials-maven-newmodule.jpg "tutorials-maven-newmodule.jpg")

## 2.7 Webapp模块修改

最终部署运行的模块是创建的war模块，在当前开发下，可通过拷贝macula-webapp下的src/resources和src/webapp目录下的所有文件，然后对相关文件进行修改的方式进行。

* **web.xml修改**

    可将web显示的名称修改为需要的业务系统名称
    
* **macula.properties修改**

    需要修改应用的名称、应用实例的名称、CAS验证地址等信息。
    
* **applicationContext-root.xml修改**

    该文件主要修改连接数据库的信息。
通过修改上述文件后，即可完成项目的发布与部署。

## 2.8 打包

通过maven命令，mvn package可实现打包，如果需要发布到仓库中，可使用mvn install命令。

## 2.9 程序开发

### 2.9.1 概要介绍

Macula 框架使用了 Spring，JPA（Hibernate），JQuery和KnockoutJS 等关键技术，所以要想熟练掌握框架，需要对这些技术很熟悉。一般做过 Java 开发的对 Spring 和 JPA（Hibernate） 都会有些了解，但对 JQuery 和 KnockoutJS 可能了解不多，特别是 KnockoutJS。所以有必要加强对 JQuery 和 KnockoutJS 的学习。 下面列举了 JQuery 和 KnockoutJS 的教程的链接，希望能帮助开发人员快速掌握这两种技术。

JQuery 教程

http://docs.jquery.com/Tutorials

KnockoutJS 教程

http://learn.knockoutjs.com/

该教程是假设开发人员已经获取到 Macula 平台的代码，并且配置好了 Eclipse 开发环境。教程从实际开发角度出发，一步步详细解释了整个开发过程。

### 2.9.2 Domain 和 DAO 层

Macula 平台的 DAO 层基于 Spring-Data-JPA（hibernate） 做了一些封装，功能很全面，只要在指定 package 下定义好 domain model 和 Repository 接口，就可以实现很完善的数据存储功能。

#### 2.9.2.1 Domain 定义

Domain 的定义也是采用接口类和实现类的方式（业务系统中，可以接口与实现使用相同的类，简化开发的工作量），在实现类中通过 annotation 加上数据库表和字段的定义。 Domain 接口类放在 macula-xxx-base 资源包里，对应的 package 是类似这样：

```
package org.macula.uim.base.domain;
```

接口类示例：

```
public interface User {

	/** 用户名 */
	String getUserName();

	/** 密码 */
	String getPassword();

	/** 用户类型 */
	String getUserType();
}
```

Domain 的实现类也是放在 macula-xxx-base 资源包里，对应的 package 是类似这样：

```
package org.macula.uim.base.domain.impl;
```

实现类的示例：

```
@Entity
@org.hibernate.annotations.Entity(dynamicInsert = true, dynamicUpdate = true)
@Table(name = "MA_UIM_USER")
public class JpaUIMUser extends AbstractAuditable<Long> implements User {

	private static final long serialVersionUID = Version.value();

	/** 用户名 */
	@Column(name = "USER_NAME", length = 50, nullable = false, unique = true)
	@Size(min = 3, max = 50)
	private String userName;

	/** 密码 */
	@Column(name = "PASSWORD", length = 50, nullable = false)
	@Size(min = 3, max = 50)
	@JsonIgnore
	@XStreamOmitField
	private String password;

	/** 用户类型 */
	@Column(name = "USER_TYPE", length = 3, nullable = false)
	@NotNull
	private String userType;
}
```

从实现类我们可以看到通过 annotation 加了数据库表和字段的定义，通过在EntityManagerFactory的定义中加入Domain所在的包后，Macula 平台可以自动扫描这些 Domain 定义，如果指定了自动生成数据库表结构，那么可以自动生成对应的数据库表。

#### 2.9.2.2 Repository 类定义

Repository 相当于 DAO 层，通过操作 Domain 存取数据。

Repository 一般只需要增加一个接口类，并且继承 MaculaJpaRepository 就可以，Macula 平台可以在运行环境中自动产生实现类，并实现常用的 DAO 操作。

Repository 接口的示例如下：

```
public interface SyncSendLogRepository extends MaculaJpaRepository<JpaSyncSendLog, Long> {
```
如果常用的 DAO 操作不够用，可以定义特殊的 Repository 接口类，增加我们需要的方法，并增加相应的实现类。（这里涉及到一个Repository扫描的定义）

### 2.9.3 Service 层
我们需要在 Service 层提供常用的方法，比如 list、save、delete 等。

首先在 Service 接口类中增加方法定义，示例如下：
```
Page<JpaUIMUser> getAllUsers(Pageable pageable); 
```
然后在 Service 实现类中增加实现方法，示例如下：
```
@Override
public Page<JpaUIMUser> getAllUsers(Pageable pageable) {
	return uimUserRepository.findAll(pageable);
}
```
上面示例实现的是list方法，list一般需要支持分页功能。

该实现方法调用了 DAO 层的对应方法，这个方法是已经存在的，只要 UIMUserRepository 是按照 Macula 框架标准定义的就可以。

DAO 层的注入使用Spring的注入annotation，示例如下：
```
@Autowired
private UIMUserRepository uimUserRepository;	
```
根据一定的命名规则，Macula 就可以自动完成 Repository 实例的注入，我们不需要考虑实例化的处理。

**新增加 Service 类需要注意的问题**

增加 Service 类一般是先定义 Service 接口类，然后定义 Service 实现类，注意要在 Service 实现类声明上面加上 annotation @Service，对于涉及到数据库修改的实现，需要加上@Transactional。

### 2.9.4 Controller 层

要选择专门存放 controller 类的 package 下，比如 org.macula.admin.base.controller 下。在 Controller 中一般需要调用 Service 层，Macula 框架使用Spring的注入annotation 来处理 Service 层的注入，示例如下：

```
@Autowired
private UserManagerService userManagerService;
```

Autowired 来帮助我们把 Service 注入到 Controller 中，我们可以在 Controller 直接使用 Service 的各种接口，不需要考虑实例化的处理。

**新增加的 Controller 类需要注意的问题**

要在类声明上面加上 annotation @Controller，这个很重要，是让我们框架能自动识别这个类是 Controller 类，如果不加就会出问题。

这部分自动扫描 Controller 的配置是在各资源包的这个文件中

src/main/resources/META-INF/spring/macula-xxx-servlet.xml

里面有一行：

```
<context:component-scan base-package="org.macula.admin.**.controller" />
```
是用来设置需要扫描哪些 package。

#### 2.9.4.1 Spring MVC 方式

方法声明里需要有 org.springframework.ui.Model 参数，方法上面需要加上 annotation @RequestMapping，映射到 URL 请求，示例：

```
@RequestMapping(value = "/system/runtime", method = RequestMethod.GET)
public String showSnapshot(Model model) {
  …
}
```

需要传递给页面的数据采用 model.addAttribute(“attributeName”, attributeObject); 的方式，在FreeMarker 页面上采用 ${attributeName.propertyName} 的方式访问。

附：示例用到的 Java Bean 部分代码，下面的示例代码可能涉及这个 Bean：

```
/**
 * @return the name
 */
public String getName() {
	return name;
}

/**
 * @return the vmName
 */
public String getVmName() {
	return vmName;
}
```

#### 2.9.4.2 AJAX JSON 方式

对于需要支持 AJAX JSON 的 controller 方法不需要 org.springframework.ui.Model 参数，需要增加 annotation @OpenApi，controller 方法可以直接返回 pojo bean。方法声明格式示例：

```
@RequestMapping(value="/system/runtime/get",method=RequestMethod.GET)
@OpenApi
public RuntimeSnapshot getRuntimeSnapshot() {
	return RuntimeSnapshot.take();
}
```

返回的数据在页面上会通过 AJAX 的方式获取到。

因为大部分列表功能都是支持分页功能的，我们下面讲解一下怎样做支持分页的列表功能。

因为Macula的数据读取是采用 AJAX 的方式处理的。所以我们针对这个列表功能要增加两个 controller 方法，一个是用来显示页面，采用了 Spring MVC 的方式；另一个是用来读取数据给 AJAX 请求。

方法一示例：
```
@RequestMapping(value = "/user/list", method = RequestMethod.GET)
public String list() {
	return super.getRelativePath("/user/list");
}
```

这个方法是用来显示页面，页面文件是 src/main/resources 对应 /user/ 目录下的 list.ftl 文件。

方法二示例：

```
@RequestMapping(value = "/user/users", method = RequestMethod.POST)
@OpenApi
public Page<JpaUIMUser> getUsers(Pageable pageable) {
	return userManagerService.getAllUsers(pageable);
}	
```

这个方法是获取到一页数据，并把数据返回，是直接返回 bean list 结果，到 AJAX 客户端会转成 JSON 格式。

###2.9.5 页面层

页面部分有两个文件，一个是 .ftl 文件，另一个是 .js 文件，.ftl 文件是定义页面显示界面，.js 文件是 JavaScript 逻辑，用于实现数据的存取处理。在ftl文件中，通过scriptJs把javascript逻辑包含进来。

####2.9.5.1 Spring MVC 方式

只需要增加 .ftl 页面，在 .ftl 页面里采用 FreeMarker 的方式访问返回的数据。

示例：
```
${runtime.name}
${runtime.vmName}
```
####2.9.5.2 AJAX JSON 方式

需要增加 .ftl 页面和对应的 .js 文件，在 .js 文件里实现数据的读取和绑定处理，采用了 KnockoutJS 的技术。

.ftl 页面示例：
```
<span data-bind="text: name"></span>
<span data-bind="text: vmName"><span>
```
.js 文件示例：
```
$(function() {
	var code = 'system-runtime';

	var viewModel = ko.mapping.fromJS({
		name : '',
		vmName : '',
	});

	ko.applyBindings(viewModel);
			
	$.getJSON(base + '/admin/macula-base/system/runtime/get', function(data) {
		ko.mapping.updateFromJS(viewModel, data.returnObject);
	});
});
```
#### 2.9.5.3 List 页面

List 页面主要分为3个部分，第一部分是上面的功能按钮部分，第二部分是中间的数据列表显示部分，第三部分是下面的分页处理部分。

整个页面的结构是这样的：

```
<@layout.ajaxContent title="用户列表" scripts="admin/macula-uim/user/list.js">
	<#assign code="user-list" />
	<@layout.content_head>
		功能按钮部分
	</@layout.content_head>

	<@layout.content_main>
		数据列表显示部分
	</@layout.content_main>

<@layout.content_foot>  //分页处理部分，这部分基本都是一样的
		<@layout.content_pager "${code}"/>
</@layout.content_foot>
</@layout.ajaxContent>
```

页面部分用到了 JQuery 和 KnockoutJS 技术，两种技术结合到一起使用，看起来不太容易理解。下面从功能按钮部分开始，详细讲解一下相关内容。

**功能按钮部分**

看一下新增按钮在页面中的定义：

```
<button id="finder-add-action-${code}" type="button" class="btn btn-has-icon"
	href="javascript:void(0);" target="dialog::{title: '新增用户', width:'650',height:'600'}"
	url="admin/macula-uim/user/create">
	<span><span><i class="btn-icon"><@macula.themeImage src="bundle/btn_add.gif"/></i>新增用户</span></span>
</button>
```

这个按钮是弹出一个对话框，显示新增的界面，里面没有太多处理，主要需要注意 target 和 url 的定义，”dialog” 表示以一个 DIV 层的方式显示对话框，可以定义对话框的标题、宽和高。url 是对话框要显示的页面的 url。

再看一下编辑按钮，编辑按钮是在列表中选中一条记录后点击来修改记录。

```
<button id="finder-edit-action-${code}" type="button" class="btn btn-has-icon" data-bind="click: onEditAction, enable: onEditEnable"
	href="javascript:void(0);" target="dialog::{title: '编辑用户', width:'650',height:'600'}">
	<span><span><i class="btn-icon"><@macula.themeImage src="bundle/btn_edit.gif"/></i>编辑</span></span>
</button>
```

