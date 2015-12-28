# 权限管理

权限管理作为macula-base的主要部分，包括了用户属性、用户组、角色、菜单、资源、功能权限、数据权限等多方面的内容。

在用户权限架构方面，围绕用户自身，主要有用户分组和用户角色两大块。

对于资源部分，当前实现的资源主要有菜单资源和功能资源，用来解决功能权限的问题，对于数据权限，将通过与角色、用户属性、待检测数据联合作用的方式来实现数据权限。

## 17.1 权限管理的几大主体

权限管理主要是围绕用户、角色、用户组等几方面而形成的对某资源具有操作或不可操作的问题。它包含的主体有：

* 用户（User）

    来自J2EE世界的Principal，对应着登录用户。
    
* 用户分组（Catalog）

    按一定的规则将用户分成的类别，比如组织机构就是一种用户分组。
    
    用户分组可按组织机构分（Organization），也可按用户组分（UserGroup）或其他的分类方式。
    
    用户分组是一种逻辑意义上的用户分类，它主要是将一些信息附属到用户信息上。
    
* 角色（Role）

    角色是权限授权与鉴权的主体，角色将于用户形成用户角色管理，角色同时与资源也形成角色资源关联。在校验用户是否具备操作某资源时，实际上是通过检测用户角色列表与可操作资源的角色列表之间是否存在交集的问题。

    在Macula权限设计中，角色可分为普通角色与计算角色。
    
    * 普通角色：是指需要主动与用户产生关联关系后，用户才能拥有的角色；
    * 规则角色：是指不需要主动与用户产生关联，通过用户已有的属性，以及角色给定的表达式，计算用户是否具备的角色。
    
    在1.1.0版之后，加入了角色可继承属性，继承类型的角色，只能是普通角色，其可授权范围受限于其所继承的角色。

    对于非系统管理员来说，只能创建继承角色。
    
* 资源（Resource）

    资源是一类具有时间性的可访问或操作的集合，最有代表的资源就是系统的菜单。
    
* 应用（Application）

    是指具体的业务系统应用，这里只是应用的一个定义。
    
* 这几个权限主体的相互关系如下图所示：

    ![macula-security-acl.jpg](../images/chapter3/macula-security-acl.jpg "macula-security-acl.jpg")
    
## 17.2 权限配置

![macula-security-biz.jpg](../images/chapter3/macula-security-biz.jpg "macula-security-biz.jpg")

## 17.3 用户分组提供者接口

默认情况下，Macula框架只提供了基于组织结构的用户分组，如果需要添加其他的用户分组信息，可以通过实现SecurityCatalogProvider的方式提供新的用户分组信息。

Macula框架实现了一个抽象类AbstractCatalogProvider，可以基于AbstractCatalogProvider快速添加一个新的用户分组，不过用户分组与用户之间的关系会统一由Macula框架来管理，如果需要自行管理，则不能使用该抽象类。

```java
public interface SecurityCatalogProvider extends SecurityProvider {

	/**
	 * 获取该分类下的所有信息.
	 * 
	 * @return 该分类所有信息列表
	 */
	List<CatalogData> list();

	/**
	 * 获取指定用户在该分类下所拥有的分类列表.
	 * 
	 * @param username
	 *            用户名
	 * @return 用户在该分类下的信息列表
	 */
	List<CatalogData> getCatalogsByUser(String username);

	/**
	 * 获取该分类下具体值所关联的用户列表.
	 * 
	 * @param catalogId
	 *            具体的分类值
	 * @return 用户列表信息
	 */
	List<String> getUsersByCatalog(Long catalogId);

	/**
	 * 在分类下加入用户关联信息
	 * 
	 * @param username
	 *            用户名
	 * @param catalogIds
	 *            具体的分类值列表
	 */
	void addCatalogsByUser(String username, Collection<Long> catalogIds);

	/**
	 * 在分类下加入用户关联信息
	 * 
	 * @param usernames
	 *            用户名列表
	 * @param catalogId
	 *            具体的分类值
	 */
	void addUsersByCatalog(Collection<String> usernames, Long catalogId);

	/**
	 * 在分类下删除用户关联信息
	 * 
	 * @param username
	 *            用户名
	 * @param catalogIds
	 */
	void removeCatalogsByUser(String username, Collection<Long> catalogIds);

	void removeUsersByCatalog(Collection<String> usernames, Long catalogId);

}    	
    	
```
