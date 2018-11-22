# 服务治理插件

该插件主要实现对微服务的治理，包括服务熔断、限流、降级、路由等功能

## 部署架构

![](/images/chapter4/sgsArchitectureDiagram.png)

##  SGS插件使用说明：

### 1. 在你项目的pom.xml里加入macula-plugins-sgs的依赖。注：这里没写版本号，保持与其他macula-plugins版本号一致便可。
```xml
<dependency>
    <groupId>org.macula.plugins</groupId>
    <groupId>org.macula.plugins</groupId>
    <version>3.0.0.RELEASE</version>
</dependency>
```        
### 2. 在项目中加入以下 Spring Bean 配置

```xml
<bean class="org.macula.plugins.sgs.subscriber.ZookeeperSubscriber">
  <constructor-arg value="127.0.0.1:2181"/>
</bean>
```

### 3. 限流或熔断的异常处理
限流，熔断事件处理建议均配置在服务治理系统中，不侵入业务代码。对于某些特殊情况需要进行代码级处理时，可捕获以下异常进行处理：

```java
// UserService 是 Dubbo 服务接口，由 Spring 注入
UserService userService = ...; 

// UserInfo 是调用 getUserInfo 方法返回的响应结果
UserInfo userInfo = null;

try {
  userInfo = userService.getUserInfo("alice");
} catch (Exception e) {
  if (DubboUtils.isBlockException(e)) {
    // 限流或熔断异常
  } else {
    // 其他异常
  }
}
```
