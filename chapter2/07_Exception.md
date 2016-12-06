# 异常处理

## 异常定义

Macula框架异常继承自org.macula.exception.MaculaException，定义如下：

```java
public abstract class MaculaException extends I18nException {

    private static final long serialVersionUID = 1L;

    public MaculaException(String message) {
        super(message);
    }

    public MaculaException(String message, Throwable cause) {
        super(message, cause);
    }

    public MaculaException(String message, Object[] args) {
        super(message, args);
    }

    public MaculaException(String message, Object[] args, Throwable cause) {
        super(message, args, cause);
    }

    public String getFullStackMessage() {
        return ExceptionUtils.getStackTrace(this);
    }

    /**
     * 父错误码
     */
    abstract public String getParentCode();

}
```

1. **父错误码**

   对于业务异常，父错误码由各个业务异常类中getParentCode定义，规则是“项目英文简称”+“.”+模块名称，该错误码用于标识该异常是属于哪个模块。并且在资源文件中定义相关信息。

   对于系统类异常，由ExceptionNegotiateFilter或者OpenApiAuthenticationFilter产生，HTTP请求类的错误的父错误码为“http”，对于OpenApiAuthenticationFilter会根据规则产生“param”的错误码，标识调用OpenApi时参数的出错情况。

2. **子错误码**

   对于业务类异常，该错误码标识由业务类异常的getMessage定义，规则是“模块名称”+“.”+“功能名称”+“.”+“错误描述”，并且在资源文件中定义相关国际化信息。

   系统类异常的错误码一般由父错误码+“两位数字”标识。


## 异常处理方式

### Service异常处理

Service层通过ServiceExceptionHandler拦截Service层抛出的异常，并且转换为MaculaException。

```java
public class ServiceExceptionHandler {

    @Autowired(required = false)
    private List<MaculaExceptionTranslator> exceptionTranslators;

    static Logger log = LoggerFactory.getLogger(ServiceExceptionHandler.class);

    public void doAfterThrowing(JoinPoint joinPoint, Throwable ex) {
        if (!(ex instanceof MaculaException)) {
            MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
            Method method = methodSignature.getMethod();

            try {
                method = joinPoint.getTarget().getClass().getMethod(method.getName(), method.getParameterTypes());
            } catch (Exception e) {
            }

            ErrorMessage errorMessage = method.getAnnotation(ErrorMessage.class);

            String message = errorMessage == null ? ex.getMessage() : errorMessage.value();

            log.error(message, ex);

            throw translate(message, ex);
        }
    }

    private MaculaException translate(String message, Throwable ex) {
        if (exceptionTranslators != null) {
            for (MaculaExceptionTranslator translator : exceptionTranslators) {
                MaculaException coreException = translator.translateExceptionIfPossible(ex);
                if (coreException != null) {
                    return new ServiceException(message, coreException);
                }
            }
        }
        return new ServiceException(message, ex);
    }
}
```

_**重要**_

如无必要，不需要自己try异常，交由框架统一拦截处理，除非是你主动抛出业务类异常，或者捕获异常后有相应处理逻辑。特别提醒，如果在事务中，Service方法中并不能捕获到数据库类型的异常，因为事务结束后才会提交数据库，这个时候抛出的异常Service方法是捕获不到的。

### Controller异常处理

Controller层自己会抛出校验类异常：

```java
public User save(@Valid @FormBean("user") User user){
    if (hasErrors()) {
        throw new FormBindException(getMergedBindingResults());
    }
    // something
    return user;
}
```

还有异常是调用其他服务类产生的异常，默认情况下，BaseController会通过@ExceptionHandler处理MaculaException和校验类的异常，这时客户端收到的是HTTP 200的响应。

框架提供的BaseController类的定义：

```java
public abstract class BaseController {

    private final ObjectMapper mapper = new ObjectMapperImpl();

    /**
     * 判断绑定过程中是否出现错误
     * 
     * @param results
     */
    protected boolean hasErrors(BindingResult... results) {
        ...
    }

    /**
     * 提取{@link FormBeanArgumentResolver}中"BINDING_RESULT_LIST_NAME"指定的BindingResult
     * 合并到results中
     * @param results BindingResult
     */
    protected BindingResult[] getMergedBindingResults(BindingResult... results) {
       ...
    }

    /**
     * 处理Controller的异常
     */
    @ExceptionHandler(MaculaException.class)
    public Response handlerCoreException(MaculaException ex, HttpServletRequest req) {
        return new Response(ex);
    }

    /**
     * 处理输入参数异常
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public Response hangdlerFormBindException(IllegalArgumentException ex, HttpServletRequest req) {
        return new Response(new MaculaArgumentException(ex));
    }
}
```

_**重要**_

_为了能使自定义异常正确的处理，这里也要求我们编写的业务模块，其Controller层的驱动必须是Annotation驱动的。  _

### 系统级异常处理

Controller层如果没有拦截到异常，则会全部由ExceptionNegotiateFilter接管处理，所有异常会统一用Response类封装，此时客户端收到的是HTTP 500的响应。

## 异常展示

异常的请求通常分为普通的HTTP请求和通过AJAX调用的请求，这两种请求接收异常和提示用户的方式有所不同。

### 普通请求异常

* 如果是BaseController拦截返回的HTTP 200类的错误信息，出现异常的Controller方法会加载webapp/src/main/resources/views/error.ftl模板，你需要根据项目自定义该模板，以符合整体UI风格。error.ftl默认内容：

```
有错误，${errors?if_exists} <BR/>
<#if errors?exists>
errorCode: ${(errors.errorCode)!''} <BR/>
errorMessage: ${(errors.errorMessage)!''} <BR/>
exceptionCode: ${(errors.exceptionCode)!''} <BR/>
exceptionMessage: ${(errors.exceptionMessage)!''} <BR/>
</#if>
```

* 如果不是BaseController拦截的异常会返回HTTP 500，所以这个时候会跳转到web.xml中定义的jsp页面，默认是webapp中的error.jsp，同样你需要根据项目UI需要作出修改：

```java
<%@ page language="java" contentType="text/html; charset=UTF-8" isErrorPage="true" pageEncoding="UTF-8"%>
<%@ page import="java.io.*,java.util.*"%>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>系统错误</title>
    </head>
    <body>
        程序发生了错误，有可能该页面正在调试或者是设计上的缺陷.
        <br /> 你可以选择
        <br />
        <a href="mailto:admin@infinitus.com.cn">反馈</a>提醒我，或者
        <br />
        <a href="javascript:history.go(-1)">返回上一页</a>
        <br /> 错误信息：<%=((org.macula.core.vo.Response)request.getAttribute("errors")).getExceptionMessage()%>
    </body>
</html>
```

### AJAX请求异常

如果BaseController拦截异常，则会返回HTTP 200的Response类的JSON数据，此时，前端应该如下处理：

```js
success : function(data) {
    if (data.success) {
        // ajax请求成功
    } else {
        // ajax请求失败
    }
}
```

如果不是BaseController拦截的异常，则返回HTTP 500的Response类的JSON数据，此时，ajax的全局错误机制会触发，具体可以看config.js中的配置：

```js
$(document).ajaxError(function(e, xhr, settings, exception) {
        var data = null, lastException = exception;
        try {
            data = $.parseJSON(xhr.responseText);
        } catch (e) {
            lastException = e;
        }

        if (lastException != null && data == null) {
            var exceptionMessage = null;
            if (typeof lastException == 'string') {
                exceptionMessage = lastException;
            } else {
                exceptionMessage = lastException.message;
            }
            if (exceptionMessage != null) {
                data = {
                    errorMessage : '',
                    exceptionMessage : exceptionMessage
                };
            }
        }
        if (xhr.status || data) {
            Config.onAjaxResponseError(xhr.status, data, settings || {}, lastException);
        }
    });
```

下面介绍不可遇见异常情况下的处理原则：

对于不可遇见异常，包括有用户未登录或权限不够异常，请求了不存在的地址异常，服务端未处理的RuntimeException抛出等等。对不可遇见的异常，其HTTP返回头状态码将不是200正常返回，按返回的类型，有如下几类：

* 服务端返回30X等信息，标识请求地址不存在

  对于此类异常，将由Macula统一处理，在客户端通过提示用户请求地址不存在的方式提示用户。

* 服务端返回40X等信息，标识未登录或权限不够

  对于此类异常，将由Macula统一调出登录页面，供用户登录，如果当前操作的用户已经登录，则提示用户可使用其他身份的用户以完成相应操作。

* 服务端返回50X等信息，标识服务端产生未处理的异常

  对于此类异常，除了提示用户出现了未知错误并记录日志外，对于当前操作人员是可查看详细信息的操作用户，则提示用户详细的异常信息以便跟踪排错。


