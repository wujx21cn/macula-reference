# 配置文件

基于Macula开发的项目，涉及到的配置文件有：

* Macula配置
* Spring配置
* JPA配置
* Freemarker配置
* Log4J配置

## 4.1 Macula配置

1.  **macula.properties**
    
    Macula配置文件 macula.properties位于Maven项目的src/main/resources目录下，实现macula平台自身的可配置信息。

    **表 4.1. macula.properties可配置属性**
    
    <table summary="macula.properties可配置属性" border="1">
    	<colgroup>
    		<col>
    		<col>
    		<col>
    		<col>
    	</colgroup>
    	<thead>
    		<tr>
    			<th>属性名称</th>
    			<th>说明</th>
    			<th>数据类型</th>
    			<th>默认值</th>
    		</tr>
    	</thead>
    	<tbody>
    		<tr>
    			<td>macula.appGroup</td>
    			<td>应用的分组，如可设置为sample</td>
    			<td>String</td>
    			<td>无</td>
    		</tr>
    		<tr>
    			<td>macula.appName</td>
    			<td>应用的名称，如可设置为sample</td>
    			<td>String</td>
    			<td>无</td>
    		</tr>
    		<tr>
    			<td>macula.casServerService</td>
    			<td>CAS服务地址，如：https://cas.infinitus.com.cn</td>
    			<td>String</td>
    			<td>无</td>
    		</tr>
    		<tr>
    			<td>macula.casClientService</td>
    			<td>CAS应用验证地址，如：https://sample.infinitus.com.cn</td>
    			<td>String</td>
    			<td>无</td>
    		</tr>
    		<tr>
    			<td>macula.resourceCachePeriod</td>
    			<td>静态资源文件的缓存时间，以秒为单位</td>
    			<td>int</td>
    			<td>0</td>
    		</tr>
    		<tr>
    			<td>jpa.showSql</td>
    			<td>JPA是否显示SQL语句</td>
    			<td>Boolean</td>
    			<td>false</td>
    		</tr>
    		<tr>
    			<td>jpa.generateDdl</td>
    			<td>JPA是否自动更新数据库表结构</td>
    			<td>Boolean</td>
    			<td>false</td>
    		</tr>
    		<tr>
    			<td>macula.resourceCachePeriod</td>
    			<td>静态文件在浏览器的缓存时间，单位毫秒</td>
    			<td>int</td>
    			<td>0</td>
    		</tr>
    		<tr>
    			<td>macula.actionAsRole</td>
    			<td>功能是否作为角色，如果启用该参数，则对Action对应的角色访问中将自动加入角色：R$_+ Action编号</td>
    			<td>Boolean</td>
    			<td>false</td>
    		</tr>
    		<tr>
    			<td>macula.maximumSessions</td>
    			<td>用户是否允许同时多Session在线，一般设置为1，表示一个用户在同一时间，只允许一个有效session登录</td>
    			<td>int</td>
    			<td>必须设置，一般为1</td>
    		</tr>
    		<tr>
    			<td>macula.captchaFailedTimes</td>
    			<td>在用户登陆时，输错多少次密码后才出现验证码，一般设置为0，表示每次都出现验证码</td>
    			<td>int</td>
    			<td>必须设置，一般为0</td>
    		</tr>
    		<tr>
    			<td>macula.sessionTime</td>
    			<td>用户的RememberMe的有效时长，单位是秒</td>
    			<td>int</td>
    			<td>必须设置，一般为1800</td>
    		</tr>
    		<tr>
    			<td>macula.runMode</td>
    			<td>Macula的运行状态，有dev，test，prd，仅为区分，暂时无用</td>
    			<td>&nbsp;</td>
    			<td>必须设置</td>
    		</tr>
    		<tr>
    			<td>pattern.datetime</td>
    			<td>Freemarker的日期时间输出格式</td>
    			<td>&nbsp;</td>
    			<td>必须设置，如yyyy-MM-dd HH:mm:ss</td>
    		</tr>
    		<tr>
    			<td>pattern.date</td>
    			<td>Freemarker的日期输出格式</td>
    			<td>&nbsp;</td>
    			<td>必须设置，如yyyy-MM-dd</td>
    		</tr>
    		<tr>
    			<td>pattern.time</td>
    			<td>Freemarker的时间输出格式</td>
    			<td>&nbsp;</td>
    			<td>必须设置，如HH:mm:ss</td>
    		</tr>
    		<tr>
    			<td>pattern.number</td>
    			<td>Freemarker的数字输出格式</td>
    			<td>&nbsp;</td>
    			<td>必须设置，如#</td>
    		</tr>
    		<tr>
    			<td>macula.protectedUrlPattern</td>
    			<td>设置访问的地址在没有Action对应时，如果匹配该路径，则使用macula.protectedUrlRole配置的角色编码作为必须具备的访问角色</td>
    			<td>String</td>
    			<td>null</td>
    		</tr>
    		<tr>
    			<td>macula.protectedUrlRole</td>
    			<td>说明如上，与macula.protectedUrlPattern配合使用</td>
    			<td>String</td>
    			<td>ROLE_PROTECTED</td>
    		</tr>
    	</tbody>
    </table>
    
    ***提示***
    
    *只有war型的模块才可能需要macula.properties文件，并放在在src/main/resources目录下，以实现运行期能通过classpath:/macula.properties访问。
    对于非war的jar型模块，依据所需的情况定制，绝大多数情况下，macula.properties文件不是必须的，更多的使用在测试场合，此时，可将macula.properties放置在src/test/resources下，使该配置在测试周期下可用。*
2. 通过Bean修改Configuration
    
    应用加载时，将通过扫描classpath路径：org.macula.core.config目录，并实现了ConfigurationProvider接口的Bean，来修改Configuration信息。

    如org.macula.core.config.PropertyConfigurationProvider就是通过读取macula.properties来读取macula平台Configuration信息的处理（即上一节的实现方式）。

## 4.2 Spring配置

Macula开发平台基于Spring框架开发，使用者需要了解Spring的基本原理以及使用方法（参见附录Spring Framework），本章介绍在Macula开发平台中，所需要配置/修改的Spring相关配置信息。

1. J2EE项目下，web.xml中的Spring通过Listener载入
    ```
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
    ```
    
2. Listener需要设置的参数
    ```
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
    
        <param-value>classpath:/configs/applicationContext-app.xml,classpath:/configs/applicationContext-macula.xml</param-value>
    
    </context-param>
        
    ```
    
    ***重要***
    
    *应用系统开发中，通过web.xml设置的Spring加载的参数值，必须按照上面的代码执行，即：文件名、目录名必须按指定的代码定义。*
    
3. configs/applicationContext-ref.xml
    
    ```
    <bean id="MaculaContextRoot" class="org.springframework.context.support.ClassPathXmlApplicationContext">
    
        <constructor-arg index="0" value="classpath:applicationContext-root.xml" />
    
    </bean>
    ```
    ***重要***
    
    *对于该文件的内容，必须与上述指定代码内容一致*
    
4. applicationContext-root.xml
    
    该文件放置路径与applicationContext-ref.xml中配置的classpath:applicationContext-root.xml一致，即必须放在src/main/resources目录。

    应用系统所使用的数据库设置必须在此文件中定义。下面是参考的代码信息：
    
    ```
        <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
    
        <property name="url">
    
            <value>jdbc:oracle:thin:@192.168.0.180:1521:dstest</value>
    
        </property>
    
        <property name="driverClassName">
    
            <value>oracle.jdbc.driver.OracleDriver</value>
    
        </property>
    
        <property name="username">
    
            <value>macula</value>
    
        </property>
    
        <property name="password">
    
            <value>macula</value>
    
        </property>
    
    </bean>
    ```
    同时，该文件也是定义配置信息（即Macula平台的Configuration信息的修改Bean）读取的设置，默认情况下，通过扫描org.macula.core.config目录下的所有Bean，在更新Configuration信息，代码如下：
    
    ```
    <context:component-scan base-package="org.macula.core.config" />
    ```
    
    ***重要***
    
    *该扫描Configuraion配置信息Bean的配置不允许修改。*
    
5. configs/applicationContext-app.xml
    
    该文件设置应用所需要包含的其他Spring配置文件，以及对系统所涉及到的公共信息Bean的定义，如：Jpa定义、Transaction定义等，该文件严禁定义更为复杂的模块信息的Bean，应有import方式导入。

    对于引入的子模块的Spring信息，必须如下定义：
    
    ```
    <import resource="classpath*:/META-INF/spring/macula-*-app.xml" />

    ```
    即对于子模块的Spring信息，必须放置在src/main/resources/META-INF/spring目录下，并严格按照macula-*-app.xml命名配置文件。
6. Sping MVC定义
    
    Spring MVC包括web.xml中对Spring Filter的定义以及对应的Spring配置信息定义。

    在web.xml中定义：
    
    ```
    <servlet>
        <servlet-name>appServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:/configs/servletContext-mvc.xml,classpath:/configs/servletContext-app.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>appServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
    ```

    ***重要*** 
    
    *应用必须严格按照上述代码定义。*
    
    在configs/servletContext-mvc.xml定义：
    
    ```
    <import resource="classpath*:/META-INF/spring/macula-*-servlet.xml">
    
    <!-- Enables the Spring MVC @Controller programming model -->
    <mvc:annotation-driven />
    
    <!-- Forwards requests to the "/" resource to the "welcome" view -->
    <mvc:view-controller path="/" view-name="main" />
    <mvc:view-controller path="/admin" view-name="admin/main" />
    
    ... 

    ```
    ***重要***
    
    *应用代码必须严格按照上述代码定义。*
    
7. configs/applicationContext-macula.xml
    
    该Spring定义为macula平台的相关配置信息，该文件可从实例代码中拷贝，并不允许修改。

8. 子模块Spring配置信息
    
    子模块Spring配置信息必须放置在src/main/resources/META-INF/spring目录下，并按照macula-*-app.xml定义，每个模块可定义多个Spring配置文件。但需要注意不要与其他模块命名相同。    


## 4.3 JPA配置

在Macula平台中，对数据存取的访问要求采用符合J2EE标准的JPA的方式，默认情况下使用JPA的Hibernate实现。

1. JPA的persistence.xml文件配置
    
    在基于macula的项目中，可以不需要配置persistence.xml文件

2. JPA中Spring的配置

    应用可创建多个JPA的EntityManagerFactory，但要求macula平台自身插件所需要的entityManagerFactory必须已在Spring配置文件中配置（配置在configs/applicationContext-app.xml）文件中，并配置了相应的Transaction处理。
    ```
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
    
   ***重要***
    
    *在上述配置中，entityManagerFactory_macula和transactionManager_macula命名不能修改，一般情况下，强烈建议您按照上述代码配置，不需要做出修改。对于业务模块来说，使用的数据库通常与macula自身的数据库不一样，这就需要配置不同的数据源、entityManagerFactory以及transactionManager。为了降低系统整体的复杂度，在同一个Request/Response周期中，尽量不要使用多个transactionManager。*
    
3. JPA部分参数设置

    在JPA的运行中有多个参数可以配置，一般情况下，采用的Hibernate的JPA实现，那么Hibernate中可用的参数，都可以通过配置的方式，配置在EntityManagerFactoryBean的配置中，这里主要介绍2个有用的配置：
    
    * showSql：是否输出SQL语句
    * generateDdl：是否输出建表语句（更新表结构语句）
    
    ***重要***
    
    *上面2个参数，如果使用默认的applicationContext-app.xml中的配置，将会读取macula框架的Configuration配置的参数值进行设定。*
    
## 4.4 Freemarker配置

在Macula平台中，Freemarker作为界面显示层的重要组成部分，在界面的显示上，均可采用Freemarker模板作为显示界面。对于Freemarker的设置，主要有2个部分：

* freemarker.properties
* 

    
