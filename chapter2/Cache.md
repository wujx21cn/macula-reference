# 缓存服务

Macula开发平台的缓存基于Spring-Cache模块，通过EhCache与Memcached两大开源实现，在此基础上提供了缓存服务的支持。为了适应Web开发中的不同生命周期数据的需要，在Spring-Cache的基础上，实现了SESSION、INSTANCE、APPLICATION级别的缓存作用域。

在介绍缓存服务前，需要注意的是：

***重要***

*缓存中的数据是不可靠的，即缓存中的数据总是有生命周期的，所以通过缓存获取到的数据，并不总是能得到期望中的值，所以程序要考虑在缓存中没有获取到正确数据的情况下，需要能通过其他方式获取，在有需要的情况下，更新缓存数据。*

## 11.1 Cache作用域

**表 11.1. Cache作用域说明**

<table summary="Cache作用域说明" border="1">
	<colgroup>
		<col />
		<col />
		<col />
	</colgroup>
	<thead>
		<tr>
			<th>作用域</th>
			<th>说明</th>
			<th>获取方式</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>SESSION</td>
			<td>基于Web容器Session的作用范围，在Session失效后，所缓存的数据将失效。</td>
			<td>
				<p>CacheUtils.getSessionCache()</p>
				<p>或通过注入CacheManager cacheManager</p>
				<p>然后通过cacheManager.getCache(CacheScope.SESSION)</p>
				<p>获取。</p>
			</td>
		</tr>
		<tr>
			<td>INSTANCE</td>
			<td>实例级作用范围，在以JVM为周期的缓存。数据缓存有效期的时间通过EhCache配置文件设定。</td>
			<td>
				<p>CacheUtils.getInstanceCache()</p>
				<p>或通过注入CacheManager cacheManager</p>
				<p>然后通过cacheManager.getCache(CacheScope.INSTANCE)</p>
				<p>获取。</p>
			</td>
		</tr>
		<tr>
			<td>APPLICATION</td>
			<td>集群级作用范围，独立于运行中的各实例，当前使用Redis来作为缓存服务器。数据缓存有效期为24小时。</td>
			<td>
				<p>CacheUtils.getApplicationCache()</p>
				<p>或通过注入CacheManager cacheManager</p>
				<p>然后通过cacheManager.getCache(CacheScope.APPLICATION)</p>
				<p>获取。</p>
			</td>
		</tr>
	</tbody>
</table>




