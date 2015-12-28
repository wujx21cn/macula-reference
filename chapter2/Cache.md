# 缓存服务

Macula开发平台的缓存基于Spring-Cache模块，通过EhCache与Memcached两大开源实现，在此基础上提供了缓存服务的支持。为了适应Web开发中的不同生命周期数据的需要，在Spring-Cache的基础上，实现了SESSION、INSTANCE、APPLICATION级别的缓存作用域。

在介绍缓存服务前，需要注意的是：

