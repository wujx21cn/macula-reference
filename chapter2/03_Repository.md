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

