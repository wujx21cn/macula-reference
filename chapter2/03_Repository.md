# 数据存取层

在数据存取层，与传统的DAO层的实现不同，这里引入Spring-Data开源框架，可实现部分接口只定义接口，而不用编写实现，可减少编码的工作量。

## 6.1 JPA数据存取接口

JPA数据存取接口JpaRepository默认可实现下列功能：

例 6.1. JpaRepository 接口
```
public interface Repository<T, ID extends Serializable> {

    T save(T entity); 

    T findById(ID primaryKey); 

    List<T> findAll(); 

    Page<T> findAll(Pageable pageable); 

    Long count(); 

    void delete(T entity); //  

    boolean exists(ID primaryKey); //  

    // & more functionality omitted.

}
```

在现有的macula框架下，因为使用Spring-Data的JPA模块来构建Repository，所以，对于一般的存取层接口来说，直接通过继承该接口的方式来实现通用存取接口的实现。

例 6.2. 比如实现Application领域模型的存取接口定义为：

```
public interface ApplicationRepository extends JpaRepository<JpaApplication, Long> {


    public JpaApplication findByAppId(String appId);

}
```

这里ApplicationRepository通过继承JpaRepository，并通过指定泛型<JpaApplication,Long>来标识JpaRepository的操作对象，即完成了Application领域模型的基本存取接口定义。

对于增加的findByAppId接口定义，将在下一节介绍。