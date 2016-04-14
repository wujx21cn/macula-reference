# 系统监控

###应用监控
Macula是用大众点评开源的[CAT](https://github.com/dianping/cat)作为应用监控的服务器端，并通过macula-plugins-cat插件集成，具体开启应用监控的步骤如下：

####首先你的应用需要依赖macula-plugins-cat插件

####创建client.xml
/data/appdatas/cat/目录下，新建一个client.xml文件(线上环境是OP配置)
如果系统是windows环境，则在eclipse运行的盘，比如D盘，新建/data/appdatas/cat/目录，新建client.xml文件
/data/appdatas/cat/client.xml,此文件有OP控制,这里的Domain名字用来做开关，如果一台机器上部署了多个应用，可以指定把一个应用的监控关闭。

```xml
<config mode="client">
          <servers>
             <server ip="10.66.13.115" port="2280" />
         </servers>
</config>
```
 alpha、beta这个配置需要自己在此目录添加
预发以及生产环境这个配置需要通知到对应OP团队，让他们统一添加，自己上线时候做下检查即可
a、10.66.13.115:2280端口是指向测试环境的cat地址
b、配置可以加入CAT的开关，用于关闭CAT消息发送,将enabled改为false，如下表示将mobile-api这个项目关闭

```xml
<config mode="client">
          <servers>
             <server ip="10.66.13.115" port="2280" />
         </servers>
         <domain id="mobile-api" enabled="false"/>
 </config>
 ```
      
####配置
1) macula.properties
```
#监控开启，默认是true，不开启监控
monitor.disabled = false
```
2) web.xml，将下面的Filter加在最前面的filter中
```xml
	<!-- Cat Filter -->
	<filter>
		<filter-name>maculaPluginsCat</filter-name>
		<filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
		<init-param>
			<param-name>targetFilterLifecycle</param-name>
			<param-value>true</param-value>
		</init-param>
	</filter>
    
    <!-- Cat Filter Mapping -->
	<filter-mapping>
		<filter-name>maculaPluginsCat</filter-name>
		<servlet-name>appServlet</servlet-name>
		<dispatcher>REQUEST</dispatcher>
		<dispatcher>FORWARD</dispatcher>
	</filter-mapping>
    ```
    这将开启对所有URL请求的监控，但是默认排除了资源文件。
    
3) log4j.properties
```
### cat appender ###
log4j.appender.cat=org.macula.plugins.cat.log4j.CatAppender

### set log levels - for more verbose logging change 'info' to 'debug' ###
log4j.rootLogger=WARN, stdout, fileout, cat
```
开启log4j发送到Cat，只有Error或以上级别的日志会发送

4) Druid DataSource配置
```xml
		<property name="proxyFilters">
			<list>
				<bean class="org.macula.plugins.cat.druid.CatFilter" />
			</list>
		</property>
```
druid数据源中添加上述配置开启对SQL的监控。

5) Spring Service监控
依赖macula-plugins-cat插件默认会开启对@Service注解的方法的监控

6) Dubbo监控
给dubbo配置上CatFilter即可完成对dubbo分布式访问的监控




      
      

###移动应用监控
###浏览器监控