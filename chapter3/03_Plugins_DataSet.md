# 数据集

为了便于数据的获取，使用Macula的各种混搭技术，我们引入了数据集的方式来产生数据集合。

数据集具有以下的特点：

1. 数据源可以基于不同的数据库，但每个数据集只能最多使用一个数据源；
2. 数据集可以配置多个不同的串行处理器；
3. 数据集可以通过编程接口编写，也可以通过XML的方式配置；

## 16.1 数据源（DataSource）

数据源表示一种数据来源。当前的数据源支持两种来源方式：

1. 数据库

    通过设定Java JDBC所需要的元素，来获取数据库连接。在JDBC环境下，可以设置两种类型的数据库连接：JNDI配置的容器级的数据源和通过JDBC创建的数据源。
    
2. LDAP

## 16.2 数据集（DataSet）

数据集表示通过数据源获取一个数据的集合。它主要由表达式、处理器链、数据源三部分来确定数据集的内容。

1. 表达式
    
    表达式可以是一个SQL语句，也可以是包含了Freemarker、Spring EL等表达式的混搭模式的字符串，表达式的内容是任意的，只要下面提到的处理器能处理。需要注意的事DataSet的目的是为了提供一个数据集合，所以表达式往往是一个SQL Select语句。

    在特殊情况下，数据集是静态的Key-Value集合，此时数据集可以不需要引用数据源（详见StaticOptionsDataHandler的介绍）。
    
2. 处理器链

    之所以称为处理器链，是因为它是由多个处理器有序的组合在一起形成的。处理器是一个org.macula.base.data.handle.DataHandler接口的实现，可以自定义一些处理器实现，对于Macula已实现的处理器有：
    
    * StaticOptionsDataHandler：
    
    最简单的处理器，是将表达按|分隔，每一部分作为集合中的一个元素从而形成的数据集合。在元素内部，继续按:分隔成Object[]数组，从而形成整个数据集。
    
    例如表达式为：
    
    ```
    name:Wilson|name:Jokeway
    ```
    
    形成的最终数据集为：
    ```java
    List<Object[]> {
        Object[] { "name", "Wilson"},
        Object[] { "name", "Jokeway"}
    }
    ```
    
    ***注意***
    
    *如果DataSet没有指定任何处理器链，并且没有指定数据源，将默认使用该处理器来获取数据结果集。*
    
    * FreemarkerDataHandler
    
    该处理器将输入的表达式当作Freemarker的片段来处理，完全遵循Freemarker的语法。由于在处理器中，总是传入了UserContext上下文，所以在Freemarker表达式中，默认可以使用的有user变量，以及UserContext中可被解析的变量，均可在Freemarker表达式中解析。

    例如，UserContext中的user为{name: Jokeway}，并且能够解析Country属性为String("China")，那么下面的表达式：
    
    ```
    我的名字是${user.name}
    <#if xyz == 'China'>
       ，你好来自中国的朋友！
    </#if>
    ```
    
    将被最终解析为：
    
    ```
    我的名字是Jokeway
    ，你好来自中国的朋友！
    ```
    
    * QueryParserDataHandler
    
    该处理器是基于Macula的语法解析方式进行解析。Macula的表达式基于Spring EL，并在Spring EL的基础上加入了自定义部分，具体如下：
    
        * \#(表达式)#
        
        这种写法，Macula认为需要将表达式解析为动态的一个变量替换（如：ptoken1)，并将表达式的结果与该变量名放入到UserContext的Map中，形成{ptoken1: 表达式的值}的方式。
        
        ***注意***
        
        *一般来讲，这类方式用来处理SQL语句中的条件部分，可以通过JDBC的setParameter方式来设置参数值的情况下使用。*
        
        * \#[表达式]#
        
        这种写法，Macula认为需要将表达式解析为一个字符串。

        例如，假如UserContext中能将China变量解析为"中国"，那么：
        
        ```
        我是#[China]#人
        ```
        将被解析为：
        ```
        我是中国人
        ```
        如果表达式解析出来是一个集合，则将集合中的元素以逗号分隔的形式展开（主要是基于SQL的特点才这样设计），还是上面的例子，如果China解析出来为List<Integer>{1,2,3}，那么整个结果将被解析为：
        
        


