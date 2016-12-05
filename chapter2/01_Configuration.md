# 配置文件

基于Macula开发的项目，您需要关注的配置文件位于您的webapp工程下，包括：

* **web.xml配置**

  * 一般情况下参考框架的配置，或者你的项目不添加这个文件，直接使用框架的。


* **Spring配置**

  * applicationContext-root.xml  数据库相关、Redis相关等需要连接外部资源的配置
  * configs/applicationContext-app.xml 事务、JPA等相关配置，与环境无关
  * configs/servletContext-app.xml MVC层面自定义配置
  * src/main/resources/META/spring/macula-\*-app.xml 非MVC层的各自模块配置文件
  * src/main/resources/META/spring/macula-\*-servlet.xml MVC层的各自模块配置文件 

* **属性配置文件**

  * **macula.properties**  Macula框架配置
  * **freemarker.properties** FreeMarker配置
  * **log4j.properties**  Log4j配置
  * druid-macula.properties Druid数据源相关的配置
  * druid-xxx.properties


### web.xml配置

1. J2EE项目下，web.xml中的Spring通过Listener载入

   ```xml
   <listener>
        <listener-class>org.macula.core.listener.MaculaContextLoaderListener</listener-class>
    </listener>
   ```

   Listener需要设置的参数

   ```xml
   <context-param>
        <param-name>locatorFactorySelector</param-name>
        <param-value>classpath:/configs/applicationContext-ref.xml</param-value>
    </context-param>
    <context-param>
        <param-name>parentContextKey</param-name>
        <param-value>MaculaContextRoot</param-value>
    </context-param>
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:/configs/applicationContext-app.xml,classpath:/configs/applicationContext-macula.xml,classpath:/configs/applicationContext-security.xml</param-value>
    </context-param>
   ```

2. Spring MVC包括web.xml中对Spring Filter的定义以及对应的Spring配置信息定义。

   在web.xml中定义：

   ```xml
   <servlet>
        <servlet-name>appServlet</servlet-name>
        <servlet-class>org.macula.core.mvc.MaculaDispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:/configs/servletContext-mvc.xml, classpath:/configs/servletContext-app.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>appServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
   ```

   _**重要**_

   _应用系统开发中，通过web.xml设置的Spring加载的参数值，必须按照上面的代码执行，即：文件名、目录名必须按指定的代码定义。_

   _web.xml的其他配置请参考macula-plugins-webapp.war中的web.xml_


### Spring配置

Macula开发平台基于Spring框架开发，使用者需要了解Spring的基本原理以及使用方法（参见附录Spring Framework），本章介绍在Macula开发平台中，所需要配置/修改的Spring相关配置信息。

1. **applicationContext-root.xml**

   该文件放置路径与applicationContext-ref.xml中配置的classpath:applicationContext-root.xml一致，即必须放在src/main/resources目录。

   应用系统所使用的数据库设置必须在此文件中定义。下面是参考的代码信息：

   ```xml
   <beans>    
       <context:annotation-config />

       <context:component-scan base-package="org.macula.core.configuration" />

       <import resource="classpath*:/META-INF/spring/macula-*-root.xml" />

       <!-- 数据源的配置 -->
       <bean id="macula_dataSource" class="com.alibaba.druid.pool.DruidDataSource" init-method="init" destroy-method="close"> 
           <!-- 配置监控统计拦截的filters -->
           <property name="filters" value="stat,config" />
           <!-- 配置CAT拦截 -->
           <property name="proxyFilters">
               <list>
                   <bean class="org.macula.plugins.cat.druid.CatFilter" />
               </list>
           </property>
           <!-- 配置数据源连接 -->
           <property name="connectionProperties"
               value="config.file=classpath:#{T(org.macula.Configuration).getProfilePath()}druid-macula.properties" />
       </bean>    

       <bean id="macula-cart_dataSource" class="com.alibaba.druid.pool.DruidDataSource" init-method="init" destroy-method="close"> 
           <!-- 配置监控统计拦截的filters -->
           <property name="filters" value="stat,config" />
           <!-- 配置CAT拦截 -->
           <property name="proxyFilters">
               <list>
                   <bean class="org.macula.plugins.cat.druid.CatFilter" />
               </list>
           </property>
           <!-- 配置数据源连接 -->
           <property name="connectionProperties"
               value="config.file=classpath:#{T(org.macula.Configuration).getProfilePath()}druid-cart.properties" />
       </bean>        

       <!-- REDIS配置 -->
       <bean id="redisTemplate" class="org.springframework.data.redis.core.RedisTemplate">
           <property name="connectionFactory" ref="redisConnectionFactory" />
       </bean>

       <alias name="redisTemplate" alias="cacheRedisTemplate"/>

       <alias name="redisTemplate" alias="transportRedisTemplate"/>

       <!-- 根据各个模块下的db/module/changelog.xml文件自动更新数据库 -->
       <bean id="macula_liquibase" class="liquibase.integration.spring.SpringLiquibase" depends-on="macula_dataSource">
           <property name="dataSource" ref="macula_dataSource" />
           <property name="defaultSchema" value="macula3" />
           <property name="changeLog" value="classpath:db/changelog-macula.xml" />
           <property name="contexts" value="dev, test" />
       </bean>

       <bean id="macula-cart_liquibase" class="liquibase.integration.spring.SpringLiquibase" depends-on="macula-cart_dataSource">
           <property name="dataSource" ref="macula-cart_dataSource" />
           <property name="defaultSchema" value="macula-cart" />
           <property name="changeLog" value="classpath:db/changelog-macula-cart.xml" />
           <property name="contexts" value="dev, test" />
       </bean>    

       <beans profile="dev,default">
           <bean id="redisConnectionFactory" class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory">
               <property name="hostName" value="127.0.0.1" />
           </bean>
       </beans>

       <beans profile="local">
           <bean id="redisConnectionFactory" class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory">
               <property name="hostName" value="localhost" />
           </bean>
       </beans>
   </beans>
   ```

   * 上述配置文件首先配置了框架的Configuration扫描，这里不需要修改，同时，如果需要放在根环境预先加载的spring配置可以放在/src/main/resources/macula-\*-root.xml文件中。

   * 定义了两个数据源，一个指向框架，一个指向业务，具体可以根据需要修改

   * 配置了redis等其他和环境相关的配置

1. **configs/applicationContext-app.xml**

   该文件设置应用所需要包含的其他Spring配置文件，以及对系统所涉及到的公共信息Bean的定义，如：Jpa定义、Transaction定义等，该文件严禁定义更为复杂的模块信息的Bean，应有import方式导入。

   对于引入的子模块的Spring信息，必须如下定义：

   ```xml
   <import resource="classpath*:/META-INF/spring/macula-*-app.xml" />
   ```

   即对于子模块的Spring信息，必须放置在src/main/resources/META-INF/spring目录下，并严格按照macula-\*-app.xml命名配置文件。

2. configs/servletContext-app.xml

   sdfdfsdf

3. 

4. 


_**重要**_

_应用必须严格按照上述代码定义。_

在configs/servletContext-mvc.xml定义：

```xml
<import resource="classpath*:/META-INF/spring/macula-*-servlet.xml">

    <!-- Enables the Spring MVC @Controller programming model -->
    <mvc:annotation-driven />

    <!-- Forwards requests to the "/" resource to the "welcome" view -->
    <mvc:view-controller path="/" view-name="main" />
    <mvc:view-controller path="/admin" view-name="admin/main" />

    ...
```

_**重要**_

_应用代码必须严格按照上述代码定义。_

1. 子模块Spring配置信息

   子模块Spring配置信息必须放置在src/main/resources/META-INF/spring目录下，并按照macula-\*-app.xml定义，每个模块可定义多个Spring配置文件。但需要注意不要与其他模块命名相同。


### JPA配置

在Macula平台中，对数据存取的访问要求采用符合J2EE标准的JPA的方式，默认情况下使用JPA的Hibernate实现。

1. JPA的persistence.xml文件配置

   在基于macula的项目中，可以不需要配置persistence.xml文件

2. JPA中Spring的配置

   应用可创建多个JPA的EntityManagerFactory，但要求macula平台自身插件所需要的entityManagerFactory必须已在Spring配置文件中配置（配置在configs/applicationContext-app.xml）文件中，并配置了相应的Transaction处理。

   ```xml
   <!-- App Entity Manager -->
    <bean id="entityManagerFactory_macula" parent="abstractEntityManagerFactory">
        <property name="persistenceUnitManager">
            <bean class="org.springframework.orm.jpa.persistenceunit.DefaultPersistenceUnitManager">
                <property name="defaultPersistenceUnitName">
                    <value>macula</value>
                </property>
                <property name="defaultDataSource" ref="macula_dataSource" />
                <property name="packagesToScan">
                    <array>
                        <value>org.macula.base.app.domain</value>
                        <value>org.macula.base.security.domain</value>
                        <value>org.macula.base.data.domain</value>
                    </array>
                </property>
            </bean>
        </property>
    </bean>

    <!-- @Transaction -->
    <tx:advice id="maculaTxAdvise" transaction-manager="transactionManager_macula" />
    <aop:config>
        <aop:pointcut id="maculaPointcut" expression="execution(* org.macula..*.*(..)) and execution(!* org.macula.samples..*.*(..)) and @within(org.springframework.stereotype.Service)" />
        <aop:advisor advice-ref="maculaTxAdvise" pointcut-ref="maculaPointcut" />
    </aop:config>
   ```

   _**重要**_

   _在上述配置中，entityManagerFactory\_macula和transactionManager\_macula命名不能修改，一般情况下，强烈建议您按照上述代码配置，不需要做出修改。对于业务模块来说，使用的数据库通常与macula自身的数据库不一样，这就需要配置不同的数据源、entityManagerFactory以及transactionManager。为了降低系统整体的复杂度，在同一个Request/Response周期中，尽量不要使用多个transactionManager。_

3. JPA部分参数设置

   在JPA的运行中有多个参数可以配置，一般情况下，采用的Hibernate的JPA实现，那么Hibernate中可用的参数，都可以通过配置的方式，配置在EntityManagerFactoryBean的配置中，这里主要介绍2个有用的配置：

   * showSql：是否输出SQL语句
   * generateDdl：是否输出建表语句（更新表结构语句）

     _**重要**_

     _上面2个参数，如果使用默认的applicationContext-app.xml中的配置，将会读取macula框架的Configuration配置的参数值进行设定。_



### Freemarker配置

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


### Log4j配置

作为都已树枝的log4j配置文件log4j.properties文件，但这里需要说明的是，在程序中引入log时，需要引入的是org.slf4j包。

log4j.properties文件可在开发和生产两个环境下，使用不同的日志输出级别配置，以达到不同的需求的目的。

### 多环境配置问题

一般应用程序在开发、测试、生产的配置都是不一样的，框架支持在启动时添加参数来选择不同的环境参数，具体如下：

* 修改web.xml中的配置，将ContextLoaderListener改为MaculaContextLoaderListener，原来的MaculaConextListener删除，最终变成如下：

  ```xml
  <listener>
        <listener-class>org.macula.core.listener.MaculaContextLoaderListener</listener-class>
    </listener>

    <listener>
        <listener-class>org.springframework.security.web.session.HttpSessionEventPublisher</listener-class>
    </listener>

    <listener>
        <listener-class>org.springframework.web.context.request.RequestContextListener</listener-class>
    </listener>
  ```

* 启动时在命令行添加-Dmacula.profile=xxx，其中xxx表示环境路径

* 在您的webapp或者api-impl包的configs目录下根据xxx建立相应的目录，系统会自动从该目录中加载

  * macula.properties
  * freemarker.properties\(不依赖macula-base的应用不加载这个文件\)
  * log4j.properties

* 在applicationContext-root.xml中，可以通过Spring的Profile来区分环境配置，如：

  ```xml
  <beans profile="local"> 
         <bean id="redisConnectionFactory" class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory">
             <property name="hostName" value="localhost" />
         </bean>
     </beans>
  ```

  则上段配置只有当环境是local时才会加载，profile可以写入多个环境，用逗号隔开，如果profile中有default，则没有配置环境属性时也会加载，如

  ```xml
  <beans profile="default,dev"> 
        <bean id="redisConfig" class="org.springframework.data.redis.connection.RedisSentinelConfiguration">
             <constructor-arg index="0" value="mymaster" />
             <constructor-arg index="1">
                 <set>
                     <value>soa-dev01.infinitus.com.cn:26379</value>
                     <value>soa-dev01.infinitus.com.cn:26479</value>
                 </set>
             </constructor-arg>
         </bean>
    </beans>
  ```

* 数据源同样也是配置在applicationContext-root.xml中

  ```xml
  <bean id="macula_dataSource" class="com.alibaba.druid.pool.DruidDataSource" init-method="init" destroy-method="close">
         <!-- 配置监控统计拦截的filters -->
         <property name="filters" value="stat,config" />
         <!-- 配置CAT拦截 -->
         <property name="proxyFilters">
             <list>
                 <bean class="org.macula.plugins.cat.druid.CatFilter" />
             </list>
         </property>
         <!-- 配置数据源连接 -->
         <property name="connectionProperties" value="config.file=classpath:#{T(org.macula.Configuration).getProfilePath()}druid-macula.properties" />
     </bean>
  ```

* 其他如MongoDB等配置采用类似方式即可。如果启动时没有加入-Dmacula.profile，则系统会在classpath的根路径下寻找上述properties文件，同时，Configuration.getProfile\(\)和Configuration.getProfilePath\(\)返回空串。


### Macula配置

1. **macula.properties**

   Macula配置文件 macula.properties位于Maven项目的src/main/resources目录下，实现macula平台自身的可配置信息。


```
只有war型的模块才可能需要macula.properties文件，并放在在src/main/resources目录下，以实现运行期能通过classpath:/macula.properties访问。
对于非war的jar型模块，依据所需的情况定制，绝大多数情况下，macula.properties文件不是必须的，更多的使用在测试场合，此时，可将macula.properties放置在src/test/resources下，使该配置在测试周期下可用。
```

1. 通过Bean修改Configuration

   应用加载时，将通过扫描classpath路径：org.macula.core.config目录，并实现了ConfigurationProvider接口的Bean，来修改Configuration信息。

   如org.macula.core.config.PropertyConfigurationProvider就是通过读取macula.properties来读取macula平台Configuration信息的处理（即上一节的实现方式）。




