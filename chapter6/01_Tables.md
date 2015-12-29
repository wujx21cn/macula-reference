# 表结构

## 23.1 应用管理

### 23.1.1. MA_BASE_APPLICATION

**表 23.1. MA_BASE_APPLICATION**

| 字段名称 | 中文名称 | 数据库字段类型 | 是否允许为空 | 默认值 | 备注 |
| -- | -- | -- | -- | -- | -- |
| ID | 顺序号 | NUMBER(19) | NOT NULL |  | 主关键字 |
| APP_ID | 应用的ID | VARCHAR2(20) | NOT NULL |  | 唯一索引 |
| APP_NAME | 应用名称 | VARCHAR2(50) | NOT NULL |  |  |
| HOME_PAGE | 应用入口地址 | VARCHAR2(255) | NOT NULL |  |  |
| SECURE_KEY | 应用公钥 | VARCHAR2(1024) | NOT NULL | | 	OpenAPI访问时的密码 |
| PRIVATE_KEY | 应用私钥 | VARCHAR2(1024) | NOT NULL | 保留 |  |
| CONTACT | 联系方式 | VARCHAR2(255) | NULL | | |
| SUPERVISOR | 应用负责人 | VARCHAR2(255) | NULL |  |  |
| IS_SSIN | 是否支持单点登录 | NUMBER(1) | NOT NULL | 默认:1 | |
| IS_SSOUT | 是否支持单点登出 | NUMBER(1) | NOT NULL | 默认:1 | |
| THEME | 界面风格 | VARCHAR2(20) | NULL | | |
| USE_ATTRS | 是否回传属性 | NUMBER(1) | NOT NULL | 默认:0 | |
| ALLOWED_ATTRS | 回传属性 | VARCHAR2(1024) | NULL |  |  |
| COMMENTS | 应用备注 | VARCHAR2(255) | NULL |  |  |
| CREATED_BY | 创建人 | VARCHAR2(50) | NOT NULL |  |  |
| CREATED_TIME | 创建时间 | TIMESTAMP | NOT NULL |  |  |
| LAST_UPDATED_BY | 最后更新人 | VARCHAR2(50) | NOT NULL |  |  |
| LAST_UPDATED_TIME | 最后更新时间 | TIMESTAMP | NOT NULL |  |  &nbsp; |

### 23.1.2 MA_BASE_APP_INSTANCE

**表 23.2. MA_BASE_APP_INSTANCE**

| 字段名称 | 中文名称 | 数据库字段类型 | 是否允许为空 | 默认值 | 备注 |
| -- | -- | -- | -- | -- | -- |
| ID | 顺序号 | NUMBER(19) | NOT NULL |  | 主关键字 |
| APP_ID | 应用的ID | VARCHAR2(20) | NOT NULL |  | 外键 |
| CODE | 实例代码 | VARCHAR2(50) | NOT NULL |  | APP_ID+CODE唯一索引 |
| NAME | 实例名称 | VARCHAR2(50) | 	NOT NULL |  |  |
| HOME_PAGE | 实例入口地址 | VARCHAR2(255) | NOT NULL |  |  |
| CREATED_BY | 创建人 | VARCHAR2(50) | NOT NULL |  |  |
| CREATED_TIME | 创建时间 | TIMESTAMP | NOT NULL |  |  |
| LAST_UPDATED_BY | 最后更新人 | VARCHAR2(50) | NOT NULL |  |  |
| LAST_UPDATED_TIME | 最后更新时间 | TIMESTAMP | NOT NULL |  | &nbsp; |

## 23.2 数据管理

### 23.2.1 MA_BASE_DATA_SOURCE

**表 23.3. MA_BASE_DATA_SOURCE**

| 字段名称 | 中文名称 | 数据库字段类型 | 是否允许为空 | 默认值 | 备注 |
| -- | -- | -- | -- | -- | -- |
| ID | 顺序号 | NUMBER(19) | NOT NULL |  | 主键 |
| CODE | 数据源代码 | VARCHAR2(50) | NOT NULL |  | 唯一索引 |
| NAME | 数据源名称 | VARCHAR2(50) | NOT NULL |  |  |
| TYPE | 数据源类型 | VARCHAR2(10) | NOT NULL | 默认:DATABASE | 目前支持DATABASE和LDAP两种类型 |
| IS_JNDI | 是否使用jndi | NUMBER(1) | NOT NULL | 默认:0 |  |
| URI | JDBC URL地址 | VARCHAR2(255) | NOT NULL |  | 如果是JNDI，这里填写JNDI NAME |
| DRIVER | JDBC驱动 | VARCHAR2(255) | NULL |  |  |
| USER_NAME | 数据库用户名 | VARCHAR2(50) | NULL|  |  |
| PASSWORD | 数据库密码 | VARCHAR2(50) | NULL |  |  |
| VALIDATION_QUERY | 验证语句 | VARCHAR2(255) | NULL |  |  |
| MAX_ACTIVE | 最大活动时间 | NUMBER(10) | NOT NULL | 默认:0 |  |
| MAX_IDLE | 最大空闲连接数 | NUMBER(10) | NOT NULL | 默认:0 |  |
| MAX_SIZE | 最大连接数 | NUMBER(10) | NOT NULL | 默认:0 |  |
| MAX_WAIT | 最大等待时间 | NUMBER(10) | NOT NULL | 默认:0 |  |
| CREATED_BY | 创建人 | VARCHAR2(50) | NOT NULL |  |  |
| CREATED_TIME | 创建时间 | TIMESTAMP | NOT NULL |  |  |
| LAST_UPDATED_BY | 最后更新人 | VARCHAR2(50) | NOT NULL |  |  |
| LAST_UPDATED_TIME | 最后更新时间 | TIMESTAMP | NOT NULL |  | &nbsp; |

### 23.2.2 MA_BASE_DATA_ENUM

**表 23.4. MA_BASE_DATA_ENUM**

| 字段名称 | 中文名称 | 数据库字段类型 | 是否允许为空 | 默认值 | 备注 |
| -- | -- | -- | -- | -- | -- |
| ID | 顺序号 | NUMBER(19) | NOT NULL |  | 主键 |
| APP_ID | 应用ID | VARCHAR2(20) | NULL |  |  |
| TYPE | 枚举类型 | VARCHAR2(10) | NOT NULL |  | 唯一索引 |
| CODE | 枚举编码 | VARCHAR2(50) | NOT NULL |  |  |
| NAME | 枚举名称 | VARCHAR2(50) | NOT NULL |  |  |
| LOCALE | 枚举语言 | VARCHAR2(255) | NOT NULL |  | 按照java.util.Locale的标准 |
| ORDERED | 排序 | NUMBER(10) | NOT NULL | 默认:0 |  |
| IS_GROUP | 是否分组 | NUMBER(1) | NOT NULL | 默认:0 |  |
| IS_ENABLED | 是否有效 | NUMBER(1) | NOT NULL | 默认:1 |  |
| PARENT_ID | 分组父ID | NUMBER(19) | NULL |  |  |
| COMMENTS | 备注 | VARCHAR2(255) | NULL |  |  |
| CREATED_BY | 创建人 | VARCHAR2(50) | NOT NULL |  |  |
| CREATED_TIME | 创建时间 | TIMESTAMP | NOT NULL |  |  |
| LAST_UPDATED_BY | 最后更新人 | VARCHAR2(50) | NOT NULL |  |  |
| LAST_UPDATED_TIME | 最后更新时间 | TIMESTAMP | NOT NULL |  | &nbsp; |

### 23.2.3 MA_BASE_DATA_PARAM

**表 23.5. MA_BASE_DATA_PARAM**

| 字段名称 | 中文名称 | 数据库字段类型 | 是否允许为空 | 默认值 | 备注 |
| -- | -- | -- | -- | -- | -- |
| ID | 顺序号 | NUMBER(19) | NOT NULL |  | 主键 |
| APP_ID | 应用ID | VARCHAR2(20) | NULL |  |  |
| TYPE | 参数类型 | VARCHAR2(10) | NOT NULL |  | 唯一索引 |
| CODE | 参数代码 | VARCHAR2(50) | NOT NULL |  |  |
| NAME | 参数名称 | VARCHAR2(50) | NOT NULL |  |  |
| 0:7 | 1:7 | 2:7 | 3:7 | 4:7 | 5:7 |
| 0:8 | 1:8 | 2:8 | 3:8 | 4:8 | 5:8 |
| 0:9 | 1:9 | 2:9 | 3:9 | 4:9 | 5:9 |
| 0:10 | 1:10 | 2:10 | 3:10 | 4:10 | 5:10 |
| 0:11 | 1:11 | 2:11 | 3:11 | 4:11 | 5:11 |
| 0:12 | 1:12 | 2:12 | 3:12 | 4:12 | 5:12 |
| 0:13 | 1:13 | 2:13 | 3:13 | 4:13 | 5:13 |
| 0:14 | 1:14 | 2:14 | 3:14 | 4:14 | 5:14 |
| 0:15 | 1:15 | 2:15 | 3:15 | 4:15 | 5:15 |
| 0:16 | 1:16 | 2:16 | 3:16 | 4:16 | 5:16 |
| 0:17 | 1:17 | 2:17 | 3:17 | 4:17 | 5:17 |
| 0:18 | 1:18 | 2:18 | 3:18 | 4:18 | 5:18 |
| 0:19 | 1:19 | 2:19 | 3:19 | 4:19 | 5:19 |


