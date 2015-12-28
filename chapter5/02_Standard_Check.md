# 代码审计规范

说明：在代码符合基本的代码规范外，在代码提交到版本控制前，需要进行更为严格的代码审计检查。

下面通过Eclipse IDE下的多个代码检查工具，指定代码必须符合的审计规范。

## 19.1 Maven体系标准

对项目开发中的模块和项目，其文档结构，必须符合Maven标准，提供标准的pom.xml文件，并可通过Maven命令行执行的打包、测试、运行等。

## 19.2. Eclipse Code Style

在Eclipse开发环境中，导入指定的代码模版，并按照代码模板格式化代码。

* Clean Up设置

    通过Eclipse菜单 Window -> Preference -> Java -> Clean Up -> Import
    
    选择cleanup.xml文件。
    
* Code Template设置

    通过Eclipse菜单 Window -> Preference -> Java -> Code Template -> Import
    
    选择codetemplates.xml文件。
    
* Code Formatter设置

    通过Eclipse菜单 Window -> Preference -> Java -> Formatter -> Import

    选择formatter.xml文件。
    
## 19.3 Eclipse Check Style

通过Eclipse的CheckStyle插件，可以更加严格的检查Java代码的规范性。

在Eclipse -> Windows -> Preference -> checkstyle中导入checkstyle.xml ，进行代码检查。

## 19.4. Eclipse FindBugs

FindBugs作为一种静态分析工具 ，它检查类或者 JAR 文件，将字节码与一组缺陷模式进行对比以发现可能的问题。有了静态分析工具，就可以在不实际运行程序的情况对软件进行分析，起到帮助检测程序潜在的编写问题。

在使用FindBugs检测的结果中，依据错误的等级，不允许出现“严重”级别的错误，并尽可能消除“一般”性错误。

## 19.5 SVN Check In 规范

