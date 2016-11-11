# Dubbo

如果你要编写dubbo服务，建议如下分包：

###macula-cart-api
对外的服务接口

###macula-cart-api-impl
接口实现，这里可以调用repository做数据库的操作

macula-cart-repository

macula-cart-result