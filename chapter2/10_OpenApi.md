# 开放API

为了更好的提供集成功能，Macula框架可以很方便的提供给第三方调用的接口API，在展示层一章我们已经介绍了怎样将一个普通的Controller方法变成一个开放平台可以调用的API。本章主要介绍第三方调用开放平台API时需要注意的事项。

## 13.1 Open API的调用

Open API采用JAX-RS标准，所有访问基于HTTP请求进行，Open API的调用参数分为系统级参数和应用级参数。

* 系统级参数：附加在Open API的URL之后，作为Query String传递

    **表 13.1. Open API请求系统级参数**
    
    <table summary="Open API请求系统级参数" border="1">
    	<colgroup>
    		<col />
    		<col />
    		<col />
    		<col />
    	</colgroup>
    	<thead>
    		<tr>
    			<th>名称</th>
    			<th>类型</th>
    			<th>是否必要</th>
    			<th>说明</th>
    		</tr>
    	</thead>
    	<tbody>
    		<tr>
    			<td>app_key</td>
    			<td>String</td>
    			<td>Y</td>
    			<td>在Macula后台中创建应用时分配的KEY</td>
    		</tr>
    		<tr>
    			<td>timestamp</td>
    			<td>String</td>
    			<td> </td>
    			<td>时间戳，为现在的GMT时间到GMT1970年1月1日0时0分0秒的毫秒数。Open
    				API服务端允许客户端请求时间误差为5分钟。</td>
    		</tr>
    		<tr>
    			<td>sign</td>
    			<td>String</td>
    			<td>Y</td>
    			<td>对API调用的所有参数签名，包括应用级参数</td>
    		</tr>
    		<tr>
    			<td>session</td>
    			<td>String</td>
    			<td>N</td>
    			<td>CAS的PT，如果是后台应用的调用接口，无需该参数，平台会使用appKey作为用户名判定应用的权限。如果有的话，则会根据PT解析出具体操作的用户，按照具体用户的权限评定是否可以访问该Open
    				API。</td>
    		</tr>
    		<tr>
    			<td>format</td>
    			<td>String</td>
    			<td>N</td>
    			<td>目前支持xml，json格式，默认是json</td>
    		</tr>
    		<tr>
    			<td>v</td>
    			<td>String</td>
    			<td>N</td>
    			<td>API协议版本号，默认是1.0</td>
    		</tr>
    		<tr>
    			<td>sign_method</td>
    			<td>String</td>
    			<td>N</td>
    			<td>签名算法，默认支持md5和hmac两种，不写就是md5</td>
    		</tr>
    	</tbody>
    </table>
    
* 应用级参数：根据规定的请求方式不同，应用级参数传递的方式不同，GET方式应用级参数附加在Open API的URL之后作为Query String传递，POST方式的应用级参数需使用FORM提交的方式传递。

    根据具体Open API的接口描述，输入参数即为应用级参数，下面详细讲述输入参数怎样组织成应用级参数：
    
    * 原子类型：例如long,int,String等，需要形成“参数名=值”的键值对传递；
    
    * POJO对象：如User，需要形成“参数名.属性名=值”的键值对传递；
    
    * 原子类型数组：如String[]、List<String>，需要形成“参数名=值0”、“参数名=值1”等的键值对传递；
    
    * POJO对象数组：如User[]、List<User>，需要形成“参数名[index].属性名=值”等的键值对，index为数组下标；
    
    * Map<String, String>：需要形成“参数名[key]=值”的键值对传递；
    
    * Map<String, POJO>：需要形成“参数名[key].属性名=值”的键值对传递；
    
    * 对于POJO对象中如果含有POJO数组、Map、POJO则规则同上，而原子类型数组需要写成“属性名[index]=值”。
    
    * 常见的输入输出类型：
    
    ```java
    public class Response {
	/** 是否成功标识 */
	private boolean success;

	/** 系统级错误代码 */
	private String errorCode;
	/** 系统级错误信息 */
	private String errorMessage;

	/** 业务级错误代码 */
	private String exceptionCode;
	/** 业务级错误信息 */
	private String exceptionMessage;

	/** 异常详细信息 */
	private String exceptionStack;

	/** 服务端重定向信息 */
	private String redirection;

	/** 校验结果信息 */
	private List<FieldError> validateErrors;
    }
                                    
    public class ExecuteResponse<T> extends Response {
    	/** 结果信息 */
    	private T returnObject;
    }
    
    public class PageResponse<T> extends Response {
    	/** 本次请求的记录数 */
    	private int size;
    
    	/** 当前页码，从零开始 */
    	private int number;
    
    	/** 总记录数 */
    	private long totalElements;
    
    	/** 总页数 */
    	private int totalPages;
    
    	/** 本页的总记录数 */
    	private int numberOfElements;
    
    	/** 是否首页 */
    	private boolean firstPage;
    
    	/** 是否最后页 */
    	private boolean lastPage;
    
    	/** 内容列表 */
    	private List<T> content;
    }
    
    public class FieldError {
    	// 元素名，与页面元素名一致  
    	private String element;
    	
    	// 错误信息  
    	private String message;
    }
    
    public class CommonCondition {
    
    	/** 要查询的条件字段(或属性)名称 */
    	private String name;
    
    	/** 字段数据类型：Boolean, Integer, Long, Double, String, Timestamp, Date */
    	private DataType dataType;
    
    	/** 
    	 * 比较符：StartWith, EndWith, Contains, NotContains, Equals, GreaterThan, GreaterOrEqual
    	 * LessThan, LessOrEqual, NotEqual, BeforeThan, AfterThan, Between, Is, In
    	 **/
    	private CriteriaType criteriaType;
    
    	/** 条件值 */
    	private Object value;
    
    	/** 另一个条件值 */
    	private Object anotherValue;
    }
    
    public enum DataType {
    
    	Boolean(Boolean.class), Integer(Integer.class), Long(Long.class), 
        Double(Double.class), String(String.class), Timestamp(Timestamp.class), Date(Date.class);
    }
    
    public enum CriteriaType {
    	// like '%x'
    	StartWith,
    	// like 'x%'
    	EndWith,
    	// like '%x%'
    	Contains,
    	// not like '%x%'
    	NotContains,
    	// = x
    	Equals,
    	// > x
    	GreaterThan,
    	// >= x
    	GreaterOrEqual,
    	// < x
    	LessThan,
    	// <= x
    	LessOrEqual,
    	// <> x
    	NotEqual,
    	// < x 早于
    	BeforeThan,
    	// > x 晚于
    	AfterThan,
    
    	// >= x1 and < x2
    	Between,
    	Is,
    	// in ( x1, x2 )
    	In ;
    }
    ```
    
    
    
