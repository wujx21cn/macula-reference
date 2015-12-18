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


## 6.2 MaculaJpaRepository接口

为了能在Spring-Data的基础上具有一定的扩展性，Macula平台基于JpaRepository定义了MaculaJpaRepository接口，并增加了getEntityManager等方法，用来提高JpaRepository的可操作性。

***重要***

*为了适应Macula平台的扩展性，在编写Repository时，需要继承MaculaJpaRepository，而不是JpaRepository。*


## 6.3 Spring自动扫描

通过Spring-Data的自定义命名空间，可将上述的JpaRepository定义的接口直接转化为spring bean，而不需要编写实际的实现类。

例 6.3. Macula平台下定制的Repository -Factory实例：

```
<jpa:repositories base-package="org.macula.base.**.repository" entity-manager-factory-ref="entityManagerFacotry"
        transaction-manager-ref="transactionManager" factory-class="org.macula.core.repository.MaculaJpaRepositoryFactoryBean" />

```

***重要***

*请注意这里的配置与Spring-Data中介绍的一样，但factory-class请使用macula平台编写的FactoryBean，它主要完成了在自定义接口与实现时，如果使用了@Transactional或EntityManager对象，将会使用配置中的transaction-manager-ref与entity-manager-factory-ref配置的Bean作为注入，这样可保证自定义接口与原接口使用相同的jpa entityManager与事务处理。*

对于这里定义的repository命名中，各属性值的说明如下：
