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
* base-package：指明扫描时的目录，可以允许通过**的方式，定义匹配的目录。这里请在实际使用中，使包的扫描范围尽量精确，以加快扫描进度以及减少不必要的Spring Bean扫描。

* entity-manager-factory-ref：这里指明JpaRepository以及自定义接口中所使用的JPA EntityManagerFactory Bean的名字，通过这里的定义，可实现在多个JPA EntityManagerFactory Bean定义的情况下，引入正确的Bean实例。

* transaction-manager-ref：该属性指明在JpaRepository与自定义接口中，使用到了@Trasactional注解时，所使用的事务。在JpaRepository中，已经存在了定义的@Transactional注解的接口，所以为了避免在定义了多个TransactionManager的情况下，能正确引入响应的事务处理Bean，可通过该属性来定义。

* factory-class：可以看到，这里我们只定义了需要的接口，而不需要编写实现，而通过接口转化为Spring可识别的Bean，采用了Spring的FactoryBean（Bean工厂）的模式，所以需要定义一个用来生成Bean实例的工厂Class，这里，已经由Macula框架完成了该Bean工厂的实现，即org.macula.core.repository.MaculaJpaRepositoryFactoryBean，该Bean扩展自Spring-Data对应的Bean工厂，如有兴趣可继续查看Spring-Data的实现。

***重要***

*这里只定义了Repository的接口，即可通过Spring-Data的一个扫描即可生成对应的Bean的实例，看似非常神奇，实际上使用了Spring的FactoryBean的构建方式，通过工厂来返回了一个JpaRepository的实现来作为我们定义的接口的实现，而自定义的接口，则通过命名上查找对应的Class Implement来构建custom的实现。
这里repositories标签扫描的规则是：*

 * *接口扩展了JpaRepository，即extends JpaRepository。*
 * *接口如果通过注解@NoRepositoryBean，则标识不用扫描该接口*

## 6.4 接口方法

除开已有的JpaRepository中已有的接口定义不需要再编写实现类外，对于查询部分接口，也同样不需要编写实现，但需要查询方法定义名称定义符合一定的规范。

例 6.4. 根据findBy后面的属性名查询：

```
public List<Person> findByLastname(String lastname);
```

该方法标识采用Lastname属性查询Person列表，lastname的属性值为参数。


例 6.5. 根据findBy后的属性名分页、排序查询：

```
public Page<User> findByLastname(String lastname, Pageable pageable);
public List<User> findByLastname(String lastname, Sort sort);     
```

例 6.6. 根据findBy后的多个属性查询：

```
public List<Person> findByEmailAddressAndLastname(EmailAddress emailAddress, String lastname);
```


