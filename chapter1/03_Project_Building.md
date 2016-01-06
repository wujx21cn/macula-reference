# 项目构建

## 3.1 SVN项目创建



## 3.2 Maven及目录结构


    

## 3.3. 文件命名

为了规范项目的开发，在文件命名方面有一定的规则：

1. java包（文件夹）的命名
    
    java包（文件夹）必须以小写字母命名，同时按照模块名称建立父包，并按照用途可创建controller、domain、repository、service、util、support、vo子包，避免创建晦涩难懂的包名，加大系统的复杂度。

2. 国际化文件

    国际化的properties文件，统一放置在resources/i18n目录下，并按模块名称建立子目录，如macula-core的国际化文件必须放置在rseources/i18n/macula-core目录下，这样可避免文件的重名。
    
3. Spring配置文件

    对Spring的配置文件，必须放置在resources/META-INF/spring目录下，并在命名上按下列要求命名：
    
    * 应用层的命名：按照macula-模块名称-app.xml的方式命名。
    * Servlet层的命名：按照macula-模块名-servlet.xml的方式命名。

4. Freemarker文件
    
    Freemarker文件放置在resources/views目录下，并按模块名称创建子目录。

## 3.4 自定义目录

在应用开发中，需要自定义目录的情况较少，如无特殊需要，尽量减少自定义目录的情况，自定义目录会增加项目组沟通成本以及维护成本。

对于自定义目录的情况大致有：

* 为多种环境创建不同的配置
    
    这种情况下，主要使用custom目录创建同名文件，并 在pom.xml中通过定义不同的打包方式，产生如生产环境发布包、测试环境发布包等。

* webapp目录下增加其他静态文件
    
    对war模块，对于webapp下需要载入的大量的静态文件以及脚本文件，可能会加入自定义目录。

## 3.5 配置文件

macula平台下涉及的文件包括：

* macula.properties：开发平台配置文件
* Spring配置文件，将在配置文件章节介绍
* log4j.properties：log4j的配置文件
* freemarker.properties：freemarker模版的配置文件

## 3.6 依赖包及版本

Macula开发平台自身依赖了大量的第三方包，在业务系统开发中，使用依赖macula平台的模块即可，对于具体的依赖包及版本，可查看macula-parent模块中定义的pom.xml文件。



