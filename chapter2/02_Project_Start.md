# 项目集成

### 登录集成
项目开始时，首先要解决登录的验证问题，通过实现CustomUserLoginRepository接口来解决这个问题：

```java
@Component
public class CustomMyUserLoginRepository implements CustomUserLoginRepository {
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public UserPrincipal loadUserByUsername(String username) throws UsernameNotFoundException {
      // 参考下面代码完成
      JpaUIMUser user = uimUserRepository.findByUserName(username);
      if (user != null) {
          UserPrincipalImpl principal = new UserPrincipalImpl(user.getUserName());
          principal.setPassword(user.getPassword());
          return principal;
      }
      // throw new UsernameNotFoundException("AbstractUserDetailsAuthenticationProvider.badCredentials");
          }

          @Override
          public void postValidateUserPrincipal(UserPrincipal principal) throws AuthenticationException {
              // TODO 可以校验凭据的合法性，非法则抛出异常
          }
}
```

### 预验证集成

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
 
 ###日志集成







