# 数据存取层

在数据存取层，与传统的DAO层的实现不同，这里引入Spring-Data开源框架，可实现部分接口只定义接口，而不用编写实现，可减少编码的工作量。

## 6.1 JPA数据存取接口


## 6.2 MaculaJpaRepository接口




## 6.3 Spring自动扫描



## 6.4 接口方法


## 6.5 自定义接口与实现



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
