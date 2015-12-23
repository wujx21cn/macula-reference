# 时间与格式

为了适应多个时区访问一个系统的要求，有必要对时区做统一的处理，不同地区能够呈现各地区习惯的日期风格

## 时区配置

对于不同的用户请求，其时区是不一样的，为了获取不同用户的时区信息，Macula框架提供了三种方式：

1. 登录时由系统主动设置用户的时区并保存在用户的HTTP SESSION中；

    ```xml
    <bean id="timeZoneResolver" class="org.macula.core.mvc.timezone.SessionTimeZoneResolver" />
    ```
2. 登录时由系统主动设置用户的时区并保存在用户的COOKIE中；
    
    ```xml
    <bean id="timeZoneResolver" class="org.macula.core.mvc.timezone.CookieTimeZoneResolver" />
    ```
3. 登录时自动获取用户浏览器的时区；

    ```xml
    <bean id="timeZoneResolver" class="org.macula.core.mvc.timezone.CookieAutoTimeZoneResolver" />       
    ```