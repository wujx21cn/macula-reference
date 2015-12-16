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
    
* 服务器设置

    业务系统最终需要在J2EE容器中运行，这里选择Tomcat6.0作为服务器容器，在Eclipse中，需要进行相关配置。

    通过Eclipse -> Preference -> Server -> Runtime Envionment选取增加Apache Tomcat6.0服务：   
    
    ![tutorials-eclipse-server.jpg](tutorials-eclipse-server.jpg "tutorials-eclipse-server.jpg")