# 异常处理

## 10.1 异常定义

Macula框架将异常分为系统类异常、业务类异常和校验类异常，校验类异常与业务类异常处理方式相同，下面不再单独说明，业务类异常为业务模块自行抛出的异常，并且由Macula框架统一处理，该异常必须继承自org.macula.exception.MaculaException，业务类异常在返回时仍然是正常的HTTP 200响应。其他类型的异常统称为系统类异常，系统类异常系统产生，由ExceptionNegotiateFilter处理。

1. 父错误码

    对于业务异常，父错误码由各个业务异常类中getParentCode定义，规则是“项目英文简称”+“.”+模块名称，该错误码用于标识该异常是属于哪个模块。并且在资源文件中定义相关信息。

    对于系统类异常，ExceptionNegotiateFilter或者OpenApiSecurityFilter产生，HTTP请求类的错误的父错误码为“http”，对于OpenApiSecurityFilter会根据规则产生“param”的错误码，标识在调用OpenApi时参数的出错情况。
    
2. 子错误码

    对于业务类异常，该错误码标识由业务类异常的getMessage定义，规则是“模块名称”+“.”+“功能名称”+“.”+“错误描述”，并且在资源文件中定义相关国际化信息。
    
    系统类异常的错误码一般由父错误码+“两位数字”标识。

## 10.2 Controller异常处理

1. 校验类异常

    在Controller方法中如果需要调用BaseController基类中的hasErrors()方法来判断是否有校验类异常信息，如果有的话，则需要抛出表单绑定异常：
    ```java
    public User save(@Valid @FormBean("user") User user){
    if (hasErrors()) {
        throw new FormBindException(getMergedBindingResults());
    }
    // something
    return user;
    }          
    ```
    
    FormBindException类型的异常在BaseController中会统一处理。这种类型异常的HTTP响应为200。根据是否AJAX请求会主动序列化为JSON/XML格式数据。



