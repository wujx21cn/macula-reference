# 开放API

为了更好的提供集成功能，Macula框架可以很方便的提供给第三方调用的接口API，在展示层一章我们已经介绍了怎样将一个普通的Controller方法变成一个开放平台可以调用的API。本章主要介绍第三方调用开放平台API时需要注意的事项。

## 13.1 Open API的调用

Open API采用JAX-RS标准，所有访问基于HTTP请求进行，Open API的调用参数分为系统级参数和应用级参数。

* 系统级参数：附加在Open API的URL之后，作为Query String传递

    
