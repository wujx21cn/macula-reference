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

## 11.2 Session级Cache

Session级的Cache依赖于Web容器的HttpSession，在当前的部署情况下，HttpSession未做集群下的复制，所以理论上可存放任意数据，但在保证每个用户尽量少的占用系统资源的要求，尽量减少Session级的Cache数据。

在Spring中配置的Bean如下：

```xml
    <!-- Session Cache -->
	<bean class="org.macula.core.cache.session.SessionCacheFactoryBean">
		<property name="name" value="sessionCache" />
	</bean>
```

## 11.3 Instance级Cache

Instance级表示的是服务器实例级别的Cache，即以JVM为其作用域，缓存数据通过EhCache实现。

对实例级Cache的配置可通过ehcache.xml来实现。

```xml
    <cache name="instanceCache" 
        maxElementsInMemory="300"
        eternal="false"
        timeToIdleSeconds="500"
        timeToLiveSeconds="500"
        overflowToDisk="true"
        />
```
* name
    
    ehcache的cache名，对应于Instance级的Cache名称为instanceCache；

* maxElementsInMemory

    标识在Cache中可存放的数据条目数；
    
* timeToIdleSeconds

    数据闲置时间，超过闲置时间将被移除
    
* timeToLiveSeconds

    数据生存时间，即从放入Cache到数据失效的时间
    
在Spring中配置的Bean如下：

```xml
    <!-- Instance Cache -->
	<bean class="org.springframework.cache.ehcache.EhCacheCacheManager">
		<property name="cacheManager">
			<bean class="org.springframework.cache.ehcache.EhCacheManagerFactoryBean" />
		</property>
	</bean>
```

## 11.4 Application级Cache

Instance级表示的是独立于服务实例的Cache，用于多应用实例间的数据共享缓存。

对实例级Cache的配置可通过memCache的Bean来配置，它包括MemcacheFactoryBean的配置与MemcacheClient的配置。

```xml
    <bean id="redisConnectionFactory" class="org.springframework.data.redis.connection.jedis.JedisConnectionFactory">
        <property name="hostName" value="soa-dev01.infinitus.com.cn" />
    </bean>
    <bean id="redisTemplate" class="org.springframework.data.redis.core.RedisTemplate">
        <property name="connectionFactory" ref="redisConnectionFactory" />
    </bean>
    
    <!-- Application Cache -->
    <bean class="org.macula.core.cache.redis.RedisCacheManager">
        <constructor-arg index="0" ref="redisTemplate" />
        <property name="cacheName" value="applicationCache" />
    </bean>
```

## 11.5 Cache接口

Cache接口直接采用Spring-Cache的接口方式。具体可参考org.springframework.cache.Cache接口。

## 11.6 Cache的总体配置





