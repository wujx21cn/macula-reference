# 开放API

为了更好的提供集成功能，Macula框架可以很方便的提供给第三方调用的接口API，在展示层一章我们已经介绍了怎样将一个普通的Controller方法变成一个开放平台可以调用的API。本章主要介绍第三方调用开放平台API时需要注意的事项。

## Open API的调用

Open API采用JAX-RS标准，所有访问基于HTTP请求进行，Open API的调用参数分为系统级参数和应用级参数。

## Open API参数

* 系统级参数：附加在Open API的URL之后，作为Query String传递

**表 13.1. Open API请求系统级参数**
    
* 应用级参数：根据规定的请求方式不同，应用级参数传递的方式不同，GET方式应用级参数附加在Open API的URL之后作为Query String传递，POST方式的应用级参数需使用FORM提交的方式传递。根据具体Open API的接口描述，输入参数即为应用级参数，下面详细讲述输入参数怎样组织成应用级参数：

* 原子类型：例如long,int,String等，需要形成“参数名=值”的键值对传递；

* POJO对象数组：如User[]、List<User>，需要形成“参数名[index].属性名=值”等的键值对，index为数组下标；

* Map<String, String>：需要形成“参数名[key]=值”的键值对传递；

* Map<String, POJO>：需要形成“参数名[key].属性名=值”的键值对传递；

* 对于POJO对象中如果含有POJO数组、Map、POJO则规则同上，而原子类型数组需要写成“属性名[index]=值”。



