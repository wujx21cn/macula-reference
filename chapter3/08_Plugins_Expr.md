# 表达式解析

## 表达式说明

macula使用标准的Spring EL表达式，具体语法可以参考。macula支持表达式的功能有

* 用户规则定义的规则表达式

* 数据集、数据参数的SQL语句（\#\(\) \#\[\]\# 里面可以用表达式\)


默认情况下，macula表达式可以使用的变量有：

* user：代表是当前用户的userPrincipal
* 系统参数：为参数表中定义的内容，引用时使用DataParam$前缀加DataParamCode的方式。
* 自定义参数：通过new UserContextWrapper\(userContext, params\)添加自定义参数。
* 实现ValueEntryResolver接口扩展表达式。

## 实现ValueEntryResolver接口

可以通过实现ValueEntryResolver接口，使得表达式中可以直接使用该接口实现对应的KEY，也可以通过UserContext.resolve\(\)方法获取该接口实现提供的数据。

```java
public interface ValueEntryResolver extends Ordered, Comparable<ValueEntryResolver> {

    /**
     * 是否能解析.
     */
    boolean support(String key);

    /**
     * 解析指定的值.
     */
    ValueEntry resolve(String attribute, UserContext userContext);

}
```

需要注意的是，为了提高resolve接口对数据的解析速度，可以在resolve的实现中，对返回的ValueEntry设置合理的缓存级别。

## 



