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
          UserPrincipalImpl principal = new UserPrincipalImpl(user.getUserName(), user.getPassword());
          // 根据需要，将额外的用户信息放到Attributes中
          // UserInfo userInfo = xxxx.getUserInfo(username);
          // principal.addAttribute("userInfo", userInfo);
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

### 日志集成

