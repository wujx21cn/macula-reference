# 配置文件

基于Macula开发的项目，涉及到的配置文件有：

* Macula配置
* Spring配置
* JPA配置
* Freemarker配置
* Log4J配置

## 4.1 Macula配置

1. **macula.properties**
    
    Macula配置文件 macula.properties位于Maven项目的src/main/resources目录下，实现macula平台自身的可配置信息。

    **表 4.1. macula.properties可配置属性**
    
    <table summary="macula.properties可配置属性" border="1">
    	<colgroup>
    		<col>
    		<col>
    		<col>
    		<col>
    	</colgroup>
    	<thead>
    		<tr>
    			<th>属性名称</th>
    			<th>说明</th>
    			<th>数据类型</th>
    			<th>默认值</th>
    		</tr>
    	</thead>
    	<tbody>
    		<tr>
    			<td>macula.appGroup</td>
    			<td>应用的分组，如可设置为sample</td>
    			<td>String</td>
    			<td>无</td>
    		</tr>
    		<tr>
    			<td>macula.appName</td>
    			<td>应用的名称，如可设置为sample</td>
    			<td>String</td>
    			<td>无</td>
    		</tr>
    		<tr>
    			<td>macula.casServerService</td>
    			<td>CAS服务地址，如：https://cas.infinitus.com.cn</td>
    			<td>String</td>
    			<td>无</td>
    		</tr>
    		<tr>
    			<td>macula.casClientService</td>
    			<td>CAS应用验证地址，如：https://sample.infinitus.com.cn</td>
    			<td>String</td>
    			<td>无</td>
    		</tr>
    		<tr>
    			<td>macula.resourceCachePeriod</td>
    			<td>静态资源文件的缓存时间，以秒为单位</td>
    			<td>int</td>
    			<td>0</td>
    		</tr>
    		<tr>
    			<td>jpa.showSql</td>
    			<td>JPA是否显示SQL语句</td>
    			<td>Boolean</td>
    			<td>false</td>
    		</tr>
    		<tr>
    			<td>jpa.generateDdl</td>
    			<td>JPA是否自动更新数据库表结构</td>
    			<td>Boolean</td>
    			<td>false</td>
    		</tr>
    		<tr>
    			<td>macula.resourceCachePeriod</td>
    			<td>静态文件在浏览器的缓存时间，单位毫秒</td>
    			<td>int</td>
    			<td>0</td>
    		</tr>
    		<tr>
    			<td>macula.actionAsRole</td>
    			<td>功能是否作为角色，如果启用该参数，则对Action对应的角色访问中将自动加入角色：R$_+ Action编号</td>
    			<td>Boolean</td>
    			<td>false</td>
    		</tr>
    		<tr>
    			<td>macula.maximumSessions</td>
    			<td>用户是否允许同时多Session在线，一般设置为1，表示一个用户在同一时间，只允许一个有效session登录</td>
    			<td>int</td>
    			<td>必须设置，一般为1</td>
    		</tr>
    		<tr>
    			<td>macula.captchaFailedTimes</td>
    			<td>在用户登陆时，输错多少次密码后才出现验证码，一般设置为0，表示每次都出现验证码</td>
    			<td>int</td>
    			<td>必须设置，一般为0</td>
    		</tr>
    		<tr>
    			<td>macula.sessionTime</td>
    			<td>用户的RememberMe的有效时长，单位是秒</td>
    			<td>int</td>
    			<td>必须设置，一般为1800</td>
    		</tr>
    		<tr>
    			<td>macula.runMode</td>
    			<td>Macula的运行状态，有dev，test，prd，仅为区分，暂时无用</td>
    			<td>&nbsp;</td>
    			<td>必须设置</td>
    		</tr>
    		<tr>
    			<td>pattern.datetime</td>
    			<td>Freemarker的日期时间输出格式</td>
    			<td>&nbsp;</td>
    			<td>必须设置，如yyyy-MM-dd HH:mm:ss</td>
    		</tr>
    		<tr>
    			<td>pattern.date</td>
    			<td>Freemarker的日期输出格式</td>
    			<td>&nbsp;</td>
    			<td>必须设置，如yyyy-MM-dd</td>
    		</tr>
    		<tr>
    			<td>pattern.time</td>
    			<td>Freemarker的时间输出格式</td>
    			<td>&nbsp;</td>
    			<td>必须设置，如HH:mm:ss</td>
    		</tr>
    		<tr>
    			<td>pattern.number</td>
    			<td>Freemarker的数字输出格式</td>
    			<td>&nbsp;</td>
    			<td>必须设置，如#</td>
    		</tr>
    		<tr>
    			<td>macula.protectedUrlPattern</td>
    			<td>设置访问的地址在没有Action对应时，如果匹配该路径，则使用macula.protectedUrlRole配置的角色编码作为必须具备的访问角色</td>
    			<td>String</td>
    			<td>null</td>
    		</tr>
    		<tr>
    			<td>macula.protectedUrlRole</td>
    			<td>说明如上，与macula.protectedUrlPattern配合使用</td>
    			<td>String</td>
    			<td>ROLE_PROTECTED</td>
    		</tr>
    	</tbody>
    </table>
    
    **提示**
    
    只有war型的模块才可能需要macula.properties文件，并放在在src/main/resources目录下，以实现运行期能通过classpath:/macula.properties访问。
    对于非war的jar型模块，依据所需的情况定制，绝大多数情况下，macula.properties文件不是必须的，更多的使用在测试场合，此时，可将macula.properties放置在src/test/resources下，使该配置在测试周期下可用。


