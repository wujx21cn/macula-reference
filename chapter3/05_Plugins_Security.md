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





