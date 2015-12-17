# 项目构建

## 3.1 SVN项目创建

在项目启动后，需按项目情况，构建svn版本库，并按系统架构分析出的业务模块，构建项目子业务模块。

在项目命名后，在svn中构建路径trunk，tags，branches，用来进行版本控制。

例如macula平台的svn库目录为：

![macula-svn-path.jpg](macula-svn-path.jpg "macula-svn-path.jpg")

对项目的开发代码，主要在trunk中开发，在项目开发发布版本后，将通过标签以及branches的方式，记录历史版本，具体的svn操作信息请查看svn的使用指南，这里仅介绍基本的代码结构规划。

## 3.2 Maven及目录结构

当前Macula平台中的模块，包括三类，普通的java包jar、可发布到J2EE容器中的war以及用于项目管理的pom定义模块。

在一个工程中，通常定义项目所使用的各第三方包以及包的版本，在一个工程内，这些依赖包在所有的模块中必须是一致的，这就需要为所有的子模块创建一个父maven pom模块，用来集中定义这些信息。

在Macula开发平台中，macula-parent就是用来定义这些信息的，整个模块已有一个文件，即maven需要的pom.xml，在该文件中，定义了所使用的所有第三方包的信息，编译信息，模块发布信息等等。

**例 3.1. macula-parent中唯一的文件pom.xml**

```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <groupId>org.macula</groupId>

    <artifactId>macula-parent</artifactId>

    <version>0.0.1-SNAPSHOT</version>

    <packaging>pom</packaging>

    <name>Macula Framework Parent</name>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

        <jdkLevel>1.6</jdkLevel>

        <jvmargs>-XX:MaxPermSize=384m -Xms512m -Xmx1024m</jvmargs>

        <hibernate.version>3.6.0.Final</hibernate.version>

        <hibernate-validator.version>4.1.0.Final</hibernate-validator.version>

        <spring.version>3.0.5.RELEASE</spring.version>

        <spring-data-jpa.version>1.0.0.M1</spring-data-jpa.version>

        <spring-security.version>3.1.0.RC1</spring-security.version>

        <casclient.version>3.2.1-SNAPSHOT</casclient.version>

        <slf4j.version>1.6.1</slf4j.version>

    </properties>

    ...

</project>
```

在macula-parent的maven设置中，指定了maven第三方包获取点：

```
<repositories>

    <repository>

        <id>macula-repo</id>

        <name>macula-repo</name>

        <url>http://maven.infinitus.com.cn:8081/nexus/content/groups/public</url>

    </repository>

</repositories>

```

当前所有macula平台所需要使用的第三方包均可以在上述获取点获得，为了规范第三方包的使用以及避免版本冲突，在进行依赖macula平台开发的业务系统中，只允许依赖macula平台的模块，对于需要依赖第三方包的，需要提交审批，审批通过后，将在上述maven获取点能获取到该第三方报，业务系统方能使用，否则不允许使用。

下面以macula开发平台下的包为例，介绍其他包内容的创建。

除macula-webapp为war项目和macula-docs为文档说明构建项目定义为pom外，其他项目均定义成jar模块格式，通过Eclipse的maven向导可创建jar格式的maven模块。

1. jar模块目录结构
2. 

