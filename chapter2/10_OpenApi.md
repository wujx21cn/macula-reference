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
    
    
    
