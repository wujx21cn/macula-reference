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

1. 校验类异常

   在Controller方法中如果需要调用BaseController基类中的hasErrors\(\)方法来判断是否有校验类异常信息，如果有的话，则需要抛出表单绑定异常：

   ```java
   public User save(@Valid @FormBean("user") User user){
    if (hasErrors()) {
        throw new FormBindException(getMergedBindingResults());
    }
    // something
    return user;
   }
   ```

   FormBindException类型的异常在BaseController中会统一处理。这种类型异常的HTTP响应为200。

2. 业务类异常

   在Service层抛出的异常会经过ServiceExceptionHandler统一拦截转换为MaculaException，如果在Service层主动抛出MaculaException异常则不再转换，不能转换的异常会变成系统类异常，MaculaException异常在BaseController中会统一处理，并且创建一个Response类型的结果返回给访问端。这种类型异常的HTTP响应状态为正常的200。

3. 系统类异常

   除了上述两类异常由BaseController统一处理外，这类异常会由ExceptionNegotiateFilter统一拦截处理，导致系统返回HTTP状态为500的响应，并且同样构造成Response类型的结果返回。


_**重要**_

_为了能使自定义异常正确的处理，这里也要求我们编写的业务模块，其Controller层的驱动必须是Annotation驱动的。  _

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

### Controller异常处理

先看框架提供的BaseController类的定义：

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

    /**
     * 相对于Controller中的RequestMapping所指定的路径
     * 
     * @param path URL路径
     */
    protected String getRelativePath(String path) {
              ...
    }

    /**
     * 将对象转为JSON格式的数据
     * 
     * @param value
     * @return String
     */
    protected String toJson(Object value) {
             ...
    }

    private static final Map<Class<?>, String> controllerPathMapping = new ConcurrentHashMap<Class<?>, String>();
}
```

通过@ExceptionHandler注解，我们在Controller层处理校验类异常和业务类异常，并且HTTP响应返回200，如果是AJAX请求，则可以根据Response中的sucess标识提示用户，如果不是AJAX请求，则会跳转到/error.ftl模板，Response会存放在request.setAttribute\("errors", errors\)中。error.ftl模板位于webapp模块的src/main/resources/views/error.ftl中。

### 系统级异常处理

在macula-base中，通过异常处理拦截器，将HttpServletResponse进行了包装，并重写了HttpServletResponse的部分方法。

例 10.1. ExceptionNegotiateFilter中对HttpServletResponse的部分包装：

```java
@Override

public void sendError(int sc, String msg) throws IOException {

    this.message = msg;

    setStatus(sc); // super.sendError(sc, msg);

}


@Override

public void sendError(int sc) throws IOException {

    setStatus(sc); // super.sendError(sc);

}


@Override

public void sendRedirect(String location) throws IOException {

    this.redirection = location;

    setStatus(SC_MOVED_TEMPORARILY); // super.sendRedirect(location);

}


@Override

public void setStatus(int sc) {

    this.status = sc;

    this.alarm = (sc != SC_OK);

    super.setStatus(sc != SC_OK ? SC_EXPECTATION_FAILED : SC_OK);

}
```

这个包装主要实现的是在于Ajax请求时，如果程序代码调用了response.sendError或sendRedirect时，能正确返回给Ajax调用的客户端出错的信息以及重定向的地址。

## 异常展示

### 普通请求异常

### AJAX请求异常

对异常信息的处理，主要在于在Ajax请求下的异常处理，对于非Ajax请求，可通过定义服务端各错误代码的错误页面来直接实现，对于Ajax请求，由于返回信息由脚本代理而不是浏览器处理，需要作出一定的调整。

上面已经介绍了，当Ajax请求时，即使服务端返回了异常信息、重定向信息或发送错误代码头信息，均由macula的过滤器，将其转换为客户端可处理的org.macula.core.vo.Response对象，来交由客户端脚本处理。

对于出现异常的情况，按Macula平台的定义，将异常分为可预见异常与不可异常，对于不可预见异常，由macula框架统一处理，对于可预见异常，则交由具体的业务代码处理。

对于已经获取到Response对象的情况下， 服务端出现状态信息在Response.errorCode中标识。

下面介绍不可遇见异常情况下的处理原则：

对于不可遇见异常，包括有用户未登录或权限不够异常，请求了不存在的地址异常，服务端未处理的RuntimeException抛出等等。对不可遇见的异常，其HTTP返回头状态码将不是200正常返回，按返回的类型，有如下几类：

* 服务端返回30X等信息，标识请求地址不存在

  对于此类异常，将由Macula统一处理，在客户端通过提示用户请求地址不存在的方式提示用户。

* 服务端返回40X等信息，标识未登录或权限不够

  对于此类异常，将由Macula统一调出登录页面，供用户登录，如果当前操作的用户已经登录，则提示用户可使用其他身份的用户以完成相应操作。

* 服务端返回50X等信息，标识服务端产生未处理的异常

  对于此类异常，除了提示用户出现了未知错误并记录日志外，对于当前操作人员是可查看详细信息的操作用户，则提示用户详细的异常信息以便跟踪排错。


对于可预见的异常，包括数据校验异常、业务逻辑不合法异常等等信息，该类异常信息将由业务直接处理并返回相应的出错信息，交由业务客户端代码处理，Macula平台不统一处理这类异常信息。

