# 数据提供

数据提供主要解决一些公共数据的获取问题，将通用的数据获取功能提取出来，方便开发人员使用。

## 枚举数据提供

提供统一的枚举数据表，表名为MA_BASE_DATA_ENUM。

## 参数提供

提供统一的参数获取方式，这里的参数可以是一个常量，也可以是一个SQL语句或者表达式，也就是说通常我们所见的系统参数、枚举数据等信息都是通过该功能获取，上节介绍的枚举数据提供只是提供数据，具体需要使用还要在参数表做相应的定义。

通过UserContext中提供的resolve(DataParamValueEntryResolver.PREFIX + dataParamCode)方法，可以获取参数的数据，对于多列的数据集可以通过org.macula.base.data.util.DataSetUtils里面的createFieldOptions方法获取格式化好的数据。

createFieldOption方法提供进一步匹配具体的dataCode的方式，返回单条记录，这里有两种匹配方式，一种是参数SQL返回多条记录，通过循环匹配dataCode，对于数据量比较大的数据信息，可以直接在SQL中使用#(dataCode)#获取要翻译的代码。

## SQL数据提供

可以通过在数据库中配置SQL语句、数据源、参数的方式来处理复杂的SQL语句。

通过org.macula.base.data.util.DataSetUtils里面的query方法获取SQL语句的执行结果

SQL语句中的参数部分可以使用#()#或者#[]#，#()#中的参数会通过PreparedStatement注入SQL，而#[]#中的参数则是通过字符串拼接的方式组成新的SQL，如果需要用单引号包裹数据，可以使用#['var']#。

\#()#或者#()#中可以是标准的Spring表达式，默认提供的变量有自行传入的参数和UserPrincipal的对象user。

## 实现ValueEntryResolver接口

可以通过实现ValueEntryResolver接口，使得表达式中可以直接使用该接口实现对应的KEY，也可以通过UserContext.resolve()方法获取该接口实现提供的数据。

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

## 表达式说明

默认情况下，表达式可以使用的变量有：

* user：代表是当前用户的userPrincipal
* 系统参数：为参数表中定义的内容，引用时使用DataParam$前缀加DataParamCode的方式。
* 自定义参数：通过new UserContextWrapper(userContext, params)添加自定义参数。
