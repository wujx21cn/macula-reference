# 安全管理

### 表单登录

### 统一登录

### 预验证登录

如果你的项目需要通过第三方认证系统认证，则可以通过实现PreAuthenticationHandler接口，将第三方认证系统已经验证好的用户名传递给Macula的认证框架实现登录。具体实现如下：

```java
  /**
	 * 返回验证好的凭据，一般是用户名，通常是通过第三方认证系统来验证凭据
	 * @param request
	 * @return UserPrincipal
	 */
	public Object getPreAuthenticatedPrincipal(HttpServletRequest request) {
		// 获取用户名和密码，向统一认证验证你的用户名和密码
		// 成功返回用户名，否则返回null;
	}
	
	/**
	 * 通常是密码
	 * @param request
	 * @return Credentials
	 */
	public Object getPreAuthenticatedCredentials(HttpServletRequest request) {
		return “N/A”;
	}
 ```
 
 ### 移动端登录
 
 如果你的项目不愿意跳转到uim实现统一登录，只是需要UIM帮你验证表单上的用户名和密码，则可以通过
 
 ### 跨站脚本攻击防护(CSRF)
 
 macula框架由于采用了spring-security作为安全框架，所以直接采用了spring-security提供的CsrfFilter，可以通过macula.enableCsrf=true开启。
 * 开启CSRF后，macula框架默认会处理AJAX请求的CSRF Token，放入头中；
 * 如果不是AJAX提交，则需要自己在表单中加入下面的代码：
 ```
<#if _csrf?exists>
    <input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
</#if>
 ```
 具体可以参考[Spring Security Reference](http://docs.spring.io/spring-security/site/docs/current/reference/htmlsingle/#csrf)