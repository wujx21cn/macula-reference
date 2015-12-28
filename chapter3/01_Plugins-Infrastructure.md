# 基础设施

## 14.1 用户上下文

实际上，只需要通过用户名，即可通过UserContextFactory构建出用户上下文信息，对于已登录的用户，可以在HttpServletRequest中直接获取或通过相关助手类获取。通过用户上下文可方便的得到一些用户相关信息。

1. 用户接口

    用户接口是提供登录用户（或指定用户）信息的主要方式，也可构建出用户上下文信息。
    
    ```java
    public interface UserPrincipal extends UserDetails, Principal {
    
    	/**
    	 * 构建用户的上下文信息
    	 * 
    	 * @return 返回构建的用户上下文
    	 */
    	UserContext createUserContext();
    
    	/**
    	 * 获取用户分组值（比如传入'ORG'，可获取用户所属的组织机构信息）
    	 * 
    	 * @param name
    	 *            分类的名称（表示对应的CatalogProvider的名称）
    	 * @return 返回在该分类中的关联信息
    	 */
    	Collection<Catalog> getCatalogs(String name);
    
    	/**
    	 * 获取用户分组值（比如传入'ORG'，可获取用户所属的组织机构信息）
    	 * 
    	 * @param name
    	 *            分类的名称（表示对应的CatalogProvider的名称）
    	 * @return 返回关联的分组信息的编码集合
    	 */
    	Collection<String> getCatalogCodes(String name);
    
    	/**
    	 * 获取用户关联角色信息
    	 * 
    	 * @return 返回用户的角色编码集合
    	 */
    	Collection<String> getRoleCodes();
    
    	/**
    	 * 获取用户关联角色信息
    	 * 
    	 * @return 返回用户角色信息集合
    	 */
    	Collection<Role> getRoles();
    
    	/**
    	 * 获取用户关联角色信息
    	 * 
    	 * @return 返回用户关联角色Id集合
    	 */
    	Collection<Long> getRoleIds();
    
    	/**
    	 * 获取用户指定的资源类集合
    	 * 
    	 * @param name
    	 *            资源类型的名称（表示对应的ResourceProvider的名称）
    	 * @return 返回关联的资源信息列表
    	 */
    	Collection<Resource> getResources(String name);
    
    	/**
    	 * 获取资源树型列表
    	 * 
    	 * @param name
    	 *            资源类型的名称（表示对应的ResourceProvider的名称）
    	 * @param root
    	 *            资源根节点的Id
    	 * @param level
    	 *            获取根节点下的层数
    	 * @return 返回关联的资源信息列表
    	 */
    	Collection<Resource> getResourcesTree(String name, Long root, int level);
    
    	/**
    	 * 获取用户指定的资源类集合
    	 * 
    	 * @param name
    	 *            资源类型的名称（表示对应的ResourceProvider的名称）
    	 * @return 返回关联的资源编码列表
    	 */
    	Collection<String> getResourceCodes(String name);
    
    	/**
    	 * 获取用户名
    	 * 
    	 * @return
    	 */
    	@Override
    	String getUsername();
    
    	/**
    	 * 获取显示用户名
    	 * 
    	 * @return
    	 */
    	String getNickname();
    
    	/**
    	 * 获取用户设置的Locale
    	 * 
    	 * @return
    	 */
    	Locale getLocale();
    
    	/**
    	 * 检测是否有访问地址的权限
    	 * 
    	 * @param url
    	 * @param method
    	 * @return
    	 */
    	boolean hasAccess(String url, String method);
    
    	/**
    	 * 获取用户额外属性
    	 * 
    	 * @return
    	 */
    	Map<String, Object> getAttributes();
    
    	/**
    	 * 获取用户额外属性
    	 * 
    	 * @param attribute
    	 * @return
    	 */
    	Object getAttributeValue(String attribute);
    
    	/**
    	 * 设置额外属性
    	 * 
    	 * @param attributes
    	 *            *
    	 */
    	void setAttributes(Map<String, Object> attributes);
    
    	/**
    	 * 增加额外属性
    	 * 
    	 * @param attributes
    	 */
    	void addAttributes(Map<String, Object> attributes);
    
    	/**
    	 * 是否需要锁屏
    	 * 
    	 * @return
    	 */
    	boolean isIllegalRequest();
    
    	/**
    	 * 创建用户在cas登录环境下对其他系统的pt
    	 */
    	String createProxyTicket(String service);
    }    
    ```
    
2. 用户信息的获取

    * 通过HttpServletRequest获取
    
    对于已经登录的用户，可以通过HttpServletRequest来直接获取用户上下文，如：
    
    ```java
    UserPrincipal principal = (UserPrincipal) request.getUserPrincipal();
    ```
    * 通过SecurityUtils获取
    
    对于已经登录的用户，可通过SecurityUtils来获取
    
    ```java
    UserPrincipal principal = SecurityUtils.getUserDetails();
    ```
    
    * 通过UserContext获取
    
    如果仅有用户的用户名信息，也可通过先构建UserContext，然后通过UserContext反向构建UserPrincipal的方式构建用户信息。
    
    ```java
    String userName = "Wilson";
    UserContext userContext = userContextFactory.createContext(userName);
    UserPrincipal userPrincipal = userContext.getUser();
    ```
    
3. 用户上下文获取

    * 用户上下文接口
    
    ```java
    public interface UserContext {
    
        UserPrincipal getUser();
 
        String getUsername();

        Object resolve(String property);
    
        Object resolve(String property, UserContext userContext);
  
        boolean isResolved(String property);
  
        EvaluationContext createEvaluationContext();
  
        void fireUserChangedEvent();

        PolicyResult vote(String code, Object target);
    
        PolicyResult vote(String code);
    
        void destory();
    
    }    
    ```
    
    * 通过UserPrincipal直接获取
    
    如果已经有了UserPrincipal信息，可通过UserPrincipal信息直接获取。
    
    ```
    UserContext userContext = userPrincipal.createUserContext();
    ```
    
    * 通过UserContextFactory构建
    
    如果仅有用户的用户名信息，可通过UserContextFactory构建UserContext。
    
    ```
    String userName = "Wilson";
    
    UserContext userContext = userContextFactory.createContext(userName);
    ```