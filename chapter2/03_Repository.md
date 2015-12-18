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

**例 6.4. 根据findBy后面的属性名查询：**

```
public List<Person> findByLastname(String lastname);
```

该方法标识采用Lastname属性查询Person列表，lastname的属性值为参数。


**例 6.5. 根据findBy后的属性名分页、排序查询：**

```
public Page<User> findByLastname(String lastname, Pageable pageable);
public List<User> findByLastname(String lastname, Sort sort);     
```

**例 6.6. 根据findBy后的多个属性查询：**

```
public List<Person> findByEmailAddressAndLastname(EmailAddress emailAddress, String lastname);
```

**例 6.7. 根据findBy后的属性的子属性查询：**

```
public List<Person> findByAddress_ZipCode(ZipCode zipCode);
```

该方法通过address.zipCode来查询Persion对象列表

**表 6.1. 支持的属性之间的连接关键字**

<table summary="支持的属性之间的连接关键字" border="1">
	<colgroup>
		<col>
		<col>
		<col>
	</colgroup>
	<thead>
		<tr>
			<th>Keyword</th>
			<th>Sample</th>
			<th>JPQL snippet</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code class="code">And</code></td>
			<td><code class="code">findByLastnameAndFirstname</code></td>
			<td><code class="code">… where x.lastname = ?1 and
					x.firstname = ?2</code></td>
		</tr>
		<tr>
			<td><code class="code">Or</code></td>
			<td><code class="code">findByLastnameOrFirstname</code></td>
			<td><code class="code">… where x.lastname = ?1 or
					x.firstname = ?2</code></td>
		</tr>
		<tr>
			<td><code class="code">Between</code></td>
			<td><code class="code">findByStartDateBetween</code></td>
			<td><code class="code">… where x.startDate between 1? and
					?2</code></td>
		</tr>
		<tr>
			<td><code class="code">LessThan</code></td>
			<td><code class="code">findByAgeLessThan</code></td>
			<td><code class="code">… where x.age &lt; ?1</code></td>
		</tr>
		<tr>
			<td><code class="code">GreaterThan</code></td>
			<td><code class="code">findByAgeGreaterThan</code></td>
			<td><code class="code">… where x.age &gt; ?1</code></td>
		</tr>
		<tr>
			<td><code class="code">IsNull</code></td>
			<td><code class="code">findByAgeIsNull</code></td>
			<td><code class="code">… where x.age is null</code></td>
		</tr>
		<tr>
			<td><code class="code">IsNotNull,NotNull</code></td>
			<td><code class="code">findByAge(Is)NotNull</code></td>
			<td><code class="code">… where x.age not null</code></td>
		</tr>
		<tr>
			<td><code class="code">Like</code></td>
			<td><code class="code">findByFirstnameLike</code></td>
			<td><code class="code">… where x.firstname like ?1</code></td>
		</tr>
		<tr>
			<td><code class="code">NotLike</code></td>
			<td><code class="code">findByFirstnameNotLike</code></td>
			<td><code class="code">… where x.firstname not like ?1</code></td>
		</tr>
		<tr>
			<td><code class="code">OrderBy</code></td>
			<td><code class="code">findByAgeOrderByLastnameDesc</code></td>
			<td><code class="code">… where x.age = ?1 order by
					x.lastname desc</code></td>
		</tr>
		<tr>
			<td><code class="code">Not</code></td>
			<td><code class="code">findByLastnameNot</code></td>
			<td><code class="code">… where x.lastname &lt;&gt; ?1</code></td>
		</tr>
	</tbody>
</table>

关于扩展JpaRepository接口中可定义的方法而不用编写实现代码的部分，可查看Spring-Data中JPA部分（data-jpa）的文档。

## 6.5 自定义接口与实现

对于一些业务需求在以上介绍的在接口定义即可完成的，不需要编写自定义接口，否则需要编写自定义的接口并实现自定义接口。

**例 6.8. 自定义接口：UserRepositoryCustom**

```
public interface UserRepositoryCustom {


    public void someCustomMethod(User user);

}
```

**例 6.9. 自定义接口实现**

```
public class UserRepositoryImpl implements UserRepositoryCustom {

  public void someCustomMethod(User user) {
    // Your custom implementation
  }

}
```

**例 6.10. 对外使用的接口：UserRepository**

```
public interface UserRepository extends MaculaJpaRepository<User, Long>, UserRepositoryCustom {

  // Declare query methods here

}
```

参考这个流程，可以看出，只有针对特殊需要的接口，才需要编写额外的接口。

针对Java的特殊性，实现类必须实现完整的接口定义，所以对于自定义方法的部分，需要将自定义方法独立定义成一个接口类，然后将最终需要使用的接口继承该接口即可。

对于接口的实现类名，有一定的规则，默认情况下，使用接口类名+Impl的方式命名实现类，才可以通过定义自动检测到，在macula平台开发下，强制要求按这个命名规则命名。


## 6.6 自定义接口中的EntityManager和TransactionManager

为了保证repositories命名空间定义的spring自动扫描能准确的将EntityManager和TransactionManager注入到自定义的实现中，对自定义实现类需要做下列规范：

* 自定义实现类不能标记@Service、@Repository、@Component等注解

* 自定义实现类可通过@Autowire在注入需要的bean实例

* 自定义实现需要使用EntityManager时，不可通过@PersistentContext注入entityManager，只能通过实现JpaEntityManagerAware接口中的setEntityManager来获取entityManager的注入。
    
    其中JpaEntityManagerAware的接口标记如下为：
    
    ```
    public interface JpaEntityManagerAware {
    
        public void setEntityManager(EntityManager entityManager);
    
    }
    ```

注意