# 时间与格式

为了适应多个时区访问一个系统的要求，有必要对时区做统一的处理，不同地区能够呈现各地区习惯的日期风格

## 9.1 时区配置

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
    
服务器端的程序可以通过MaculaRequestContextUtils程序来设置或获取时区：

```java
public class MaculaRequestContextUtils extends RequestContextUtils {

	/**
	 * 获取当前的时区解析器
	 */
    public static TimeZoneResolver getTimeZoneResolver(HttpServletRequest request) {
        return (TimeZoneResolver) request.getAttribute(MaculaDispatcherServlet.TIMEZONE_RESOLVER_ATTRIBUTE);
    }

    /**
     * 获取当前请求的时区
     */
    public static TimeZone getTimeZone(HttpServletRequest request) {
        return getTimeZoneResolver(request).resolveTimeZone(request);
    }

}

```

Macula已经对FreeMarkerView做了处理，每次不同的用户请求会给FreeMarker设置不同的用户时区。并在FreeMarker中添加了如下变量：

* dateTimePattern：日期时间格式，来源于FreeMarker中的配置；
* datePattern：日期格式，来源于FreeMarker中的配置；
* timePattern：时间格式，来源于FreeMarker中的配置；
* timeZone：用户时区ID，为GMT格式，如GMT+08:00；
* timeZoneOffset：用户时区偏移分钟数，正时区返回的是负数，负时区返回的是正数。

***提示***

*在设置页面上的日期控件格式时，建议使用Macula暴露出来的对应的日期Pattern。*

## 9.2 日期与数字格式设置

日期格式统一设置在macula.properties中，如下所示：

```
pattern.datetime = yyyy-MM-dd HH:mm:ss
pattern.date = yyyy-MM-dd
pattern.time = HH:mm:ss
pattern.number = #
```
上述配置同样会对FreeMarker的日期格式做设置，freemarker.properties中无需再设置。

## 9.3 日期转为字符串

服务器端产生日期对象后，需要转为字符串才能显示，日期对象有java.util.Date和 org.joda.time.DateTime 。

* FreeMarker中显示日期

    在FreeMarker中，如果是java.util.Date类型的日期，可以直接通过mydate?datetime，mydate?date，mydate?time分别显示日期时间、日期、时间样式的日期字符串，格式采用预先配置的格式。而对于org.joda.time.DateTime类型的日期需要先调用toDate()方法，然后在依照java.util.Date类型的日期处理。
    
* AJAX请求返回的日期

    AJAX请求返回的日期格式默认是ISO8601标准，org.joda.time.DateTime返回如2011-07-15T12:23:45.222+08:00的格式，java.util.Date返回如2011-07-15T04:23:45.222Z的格式。
    
    Macula框架提供了$date.format(iso8601date, pattern)的方法来转换为浏览器需要显示的格式。
    
    