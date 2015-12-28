# 数据提供

数据提供主要解决一些公共数据的获取问题，将通用的数据获取功能提取出来，方便开发人员使用。

## 15.1 枚举数据提供

提供统一的枚举数据表，表名为MA_BASE_DATA_ENUM。

## 15.2 参数提供

提供统一的参数获取方式，这里的参数可以是一个常量，也可以是一个SQL语句或者表达式，也就是说通常我们所见的系统参数、枚举数据等信息都是通过该功能获取，上节介绍的枚举数据提供只是提供数据，具体需要使用还要在参数表做相应的定义。

通过UserContext中提供的resolve(DataParamValueEntryResolver.PREFIX + dataParamCode)方法，可以获取参数的数据，对于多列的数据集可以通过org.macula.base.data.util.DataSetUtils里面的createFieldOptions方法获取格式化好的数据。

createFieldOption方法提供进一步匹配具体的dataCode的方式，返回单条记录，这里有两种匹配方式，一种是参数SQL返回多条记录，通过循环匹配dataCode，对于数据量比较大的数据信息，可以直接在SQL中使用#(dataCode)#获取要翻译的代码。

## 15.3 SQL数据提供

