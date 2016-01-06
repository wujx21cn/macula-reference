# 配置文件

基于Macula开发的项目，涉及到的配置文件有：

* Macula配置
* Spring配置
* JPA配置
* Freemarker配置
* Log4J配置

## 4.1 Macula配置



## 4.2 Spring配置

 


## 4.3 JPA配置


    
## 4.4 Freemarker配置

在Macula平台中，Freemarker作为界面显示层的重要组成部分，在界面的显示上，均可采用Freemarker模板作为显示界面。对于Freemarker的设置，主要有2个部分：

* freemarker.properties

    该文件位于war模块的resources根目录，文件内容包括了可配置的Freemarker的属性。（具体的可配置属性，请参考Freemarker文档）

    freemarker.properties文件在演示的模块中，定义了：
    ```
    auto_import="/spring.ftl" as spring, "/macula.ftl" as macula, "/layout.ftl" as layout    
    ```
    
    即可以载入spring.ftl，macula.ftl，layout.ftl三个freemarker macro，这样，在其他freemarker文件中，需要使用它们定义的宏的时候，可以不用再在模块中声明导入，freemarker管理器可自动导入这三个宏并按指定的别名使用。
    
* Spring View中的设置

    ```xml
    <bean id="freemarkerConfig" class="org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer">
        <!-- preferFileSystemAccess can make hot file detection, use true for development -->
        <property name="preferFileSystemAccess" value="false" />
        <property name="templateLoaderPaths">
            <list>
                <value>classpath:views/</value>
            </list>
        </property>
        <property name="freemarkerSettings">
            <util:properties location="classpath:freemarker.properties" />
        </property>
    
        <property name="freemarkerVariables">
            <map>
                <entry key="appVersion">
                    <value>#{T(org.macula.Configuration).getAppVersion()}</value>
                </entry>
            </map>
        </property>
    </bean>    
    ```
    通过上述配置可看出，除了freemarker.properties的配置外，主要定义了Freemarker最终模板的访问路径为基于classpath:views/的路径访问，由于该路径是一个classpath路径，所以实际上，在所有的业务模块（包括war模块和jar模块）中，都可以编写freemarker文档，并能在部署后正常访问。
    
    同样，这里定义的一个主要属性是preferFileSystemAccess属性，该属性标识是否采用文件系统加载的方式加载freemarker模版，在开发模式下可设置为true，它标识能侦查到文件的变化，并自动重新加载模板。 
    
    
## 4.5 Log4j配置

作为都已树枝的log4j配置文件log4j.properties文件，但这里需要说明的是，在程序中引入log时，需要引入的是org.slf4j包。

log4j.properties文件可在开发和生产两个环境下，使用不同的日志输出级别配置，以达到不同的需求的目的。



    

    
