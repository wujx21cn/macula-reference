### 跨站伪造请求攻击防护\(CSRF\)

macula框架由于采用了spring-security作为安全框架，所以直接采用了spring-security提供的CsrfFilter，可以通过macula.enableCsrf=true开启。

* 开启CSRF后，macula框架默认会处理AJAX请求的CSRF Token，放入头中；
* 如果不是AJAX提交，则需要自己在表单中加入下面的代码：

  ```
  <#if _csrf?exists>
   <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
  </#if>
  ```

  具体可以参考[Spring Security Reference](http://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#csrf)

### 跨站脚本攻击防护\(XSS\)

### 越权访问防护

#### **需要进行防止越权访问的Controller方法改造:**

在需要进行校验的Controller方法上添加@PassKey注解，@PassKey可以支持@PathVariable和@RequestParam。

@PathVariable例子：

```java
@RequestMapping(value ="/deal/edit/{dealId}", method = RequestMethod.GET)
@OpenApi
@PassKey("dealId")
public Long editDealId(@PathVariable("dealId") LongdealId) {
        …
}
```

@RequestParam例子：

```java
@RequestMapping(value ="/deal/edit", method = RequestMethod.GET)
@OpenApi
@PassKey({"dealId"})
public Long editDealId(@RequestParam("dealId") LongdealId) {
…
}
```

如果需要对多个参数值进行校验，可以传入参数名数组，例如：

@PassKey\({"dealId", "storeId"}\)



