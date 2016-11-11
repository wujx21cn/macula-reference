# Dubbo

如果你要编写dubbo服务，建议如下分包：

###macula-cart-api
对外的服务接口，需要在src/main/resources/META-INF/macula-cart-api-consumer.xml中，引入

```
<dubbo:reference id="demoApi" interface="org.macula.cart.api.DemoApi" version="2.0.0" check="false" />
```
这样第三方引用这个API包的时候，加载xml就可以自动获取到dubbo的reference

###macula-cart-api-impl
接口实现，这里可以调用repository做数据库的操作。定义如下配置文件：
* src/main/resources/META-INF/macula-cart-api-impl-app.xml
```
<context:component-scan base-package="org.macula.cart.api.impl" />
```
用于扫描注解。

* src/main/resources/META-INF/macula-cart-api-impl-provider.xml
```
 <dubbo:service interface="org.macula.cart.api.DemoApi" ref="demoApiImpl" version="2.0.0" />
```
用于定义dubbo服务

###macula-cart-repository
数据存取层

###macula-cart-result
数据返回结果VO

