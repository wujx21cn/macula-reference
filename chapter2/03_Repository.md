# 数据存取层

在数据存取层，与传统的DAO层的实现不同，这里引入Spring-Data开源框架，可实现部分接口只定义接口，而不用编写实现，可减少编码的工作量。

## 6.1 JPA数据存取接口


## 6.2 MaculaJpaRepository接口




## 6.3 Spring自动扫描



## 6.4 接口方法


## 6.5 自定义接口与实现

对于一些业务需求在以上介绍的在接口定义即可完成的，不需要编写自定义接口，否则需要编写自定义的接口并实现自定义接口。

**例 6.8. 自定义接口：UserRepositoryCustom**

```java
public interface UserRepositoryCustom {


    public void someCustomMethod(User user);

}
```

**例 6.9. 自定义接口实现**

```java
public class UserRepositoryImpl implements UserRepositoryCustom {

  public void someCustomMethod(User user) {
    // Your custom implementation
  }

}
```

**例 6.10. 对外使用的接口：UserRepository**

```java
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
    
    ```java
    public interface JpaEntityManagerAware {
    
        public void setEntityManager(EntityManager entityManager);
    
    }
    ```

    ***注意***
    
    *该接口由macula平台提供，并由repositories中定义的factory-class：org.macula.core.repository.MaculaJpaRepositoryFactoryBean来正确处理，为了保证自定义实现能灵活的替换EntityManager而做出的扩展。*
    
* 自定义实现中的@Transactional，可直接定义在接口中，但在@Transactional的定义中，不要指定transactional使用的TrasactionManager的名称，道理和使用EntityManager相同，都由Macula平台的factory-class来统一处理。

对于Repository层的开发，这里主要介绍了macula平台在Spring-Data下做出的扩展，更多的示例可参考macula平台提供的插件模块和示例模块，对于Spring-Data自身提供的功能，可以查看Spring-Data的官方文档。
