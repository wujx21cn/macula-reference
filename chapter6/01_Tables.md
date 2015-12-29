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
| VALUE | 参数值 | 	VARCHAR2(500) | NOT NULL |  |  |
| VALUE_SCOPE | 参数值缓存级别 | VARCHAR2(20) | NOT NULL |  | NONE:不缓存 SESSION:会话级 INSTANCE:实例级 APPLICATION:应用级 |
| PARAM_CLZ | 数据类型 | VARCHAR2(10) | NULL |  | Boolean、Integer、 Long、Double、 String、Timestamp、 Date |
| DATASOURCE_ID | 数据源ID | NUMBER(19) | NULL |  | 外键 |
| ORDERED | 排序 | 	NUMBER(10) | NOT NULL | 默认:0 |  |
| IS_GROUP | 是否分组 | NUMBER(1) | NOT NULL | 默认:0 |  |
| IS_ENABLED | 是否有效 | NUMBER(1) | NOT NULL | 默认:1 |  |
| PARENT_ID | 分组父ID | NUMBER(19) | NULL | 外键 |  |
| COMMENTS | 备注 | VARCHAR2(255)| NULL |  |  |
| CREATED_BY | 创建人 | VARCHAR2(50) | NOT NULL |  |  |
| CREATED_TIME | 创建时间 | TIMESTAMP | NOT NULL |  |  |
| LAST_UPDATED_BY | 最后更新人 | VARCHAR2(50) | NOT NULL |  |  |
| LAST_UPDATED_TIME | 最后更新时间 | TIMESTAMP | NOT NULL |  | &nbsp; |

### 23.2.4 MA_BASE_DATA_SET

**表 23.6. MA_BASE_DATA_SET**

| 字段名称 | 中文名称 | 数据库字段类型 | 是否允许为空 | 默认值 | 备注 |
| -- | -- | -- | -- | -- | -- |
| ID | 顺序号 | NUMBER(19) | NOT NULL |  | 主键 |
| CODE | 数据集代码 | VARCHAR2(50) | NOT NULL |  | 唯一索引 |
| NAME | 数据集名称 | VARCHAR2(50) | NOT NULL |  |  |
| EXP_TEXT | 数据集表达式 | CLOB | NULL |  |  |
| HANDLER_CHAIN | 数据集处理链 | CLOB | NULL |  |  |
| DATASOURCE_ID | 数据源ID | NUMBER(19) | NULL |  | 外键 |
| IS_PAGABLE | 数据集是否分页 | NUMBER(1) | NOT NULL | 默认:1 |  |
| IS_GROUP | 是否分组 | NUMBER(1) | NOT NULL | 默认:0 |  |
| PARENT_ID | 分组父ID | NUMBER(19) | NULL |  | 外键 |
| MID | 所属菜单 | NUMBER(19)| NULL |  | 外键 |
| CREATED_BY | 创建人 | VARCHAR2(50) | NOT NULL |  |  |
| CREATED_TIME | 创建时间 | TIMESTAMP | NOT NULL |  |  |
| LAST_UPDATED_BY | 最后更新人 | VARCHAR2(50) | NOT NULL|  |  |
| LAST_UPDATED_TIME | 最后更新时间 | TIMESTAMP | NOT NULL |  |  |

### 23.2.5 MA_BASE_DATA_ARG

**表 23.7. MA_BASE_DATA_ARG**

| 字段名称 | 中文名称 | 数据库字段类型 | 是否允许为空 | 默认值 | 备注 |
| -- | -- | -- | -- | -- | -- |
| ID | 顺序号 | NUMBER(19) | NOT NULL |  | 	主键 |
| DATASET_ID | 数据集ID | NUMBER(19) | NOT NULL |  | 外键 |
| ARG_NAME | 输入参数名称 | VARCHAR2(20) | NOT NULL |  | DATASET_ID+ARG_NAME唯一索引 |
| ARG_LABEL | 参数标题 | VARCHAR2(50) | NOT NULL |  | 标题 |
| ARG_CLZ | 输入参数类型 | VARCHAR2(50) | NOT NULL |  | Boolean、Integer、 Long、Double、 String、Timestamp、 Date |
| ARG_CONTROL | 参数控件 | VARCHAR2(20) | NOT NULL | Text | 枚举 Text等 |
| DEFAULT_VALUE | 缺省值 | VARCHAR2(50) | NULL |  |  |
| DATAPARAM_ID | 数据参数ID | NUMBER(19) | NULL |  | 外键 |
| ALLOW_NULL | 	是否允许为空 | NUMBER(1) | NOT NULL| 默认:0 |  |
| CREATED_BY | 创建人 | VARCHAR2(50) | NOT NULL |  |  |
| CREATED_TIME | 创建时间 | TIMESTAMP | NOT NULL |  |  |
| LAST_UPDATED_BY | 最后更新人 | VARCHAR2(50) | NOT NULL |  |  |
| LAST_UPDATED_TIME | 最后更新时间 | TIMESTAMP | NOT NULL |  | &nbsp; |

## 23.3. 资源和分组

### 23.3.1. MA_BASE_ACL_MENU

**表 23.8. MA_BASE_ACL_MENU**

| 字段名称 | 中文名称 | 数据库字段类型 | 是否允许为空 | 默认值 | 备注 |
| -- | -- | -- | -- | -- | -- |
| ID	 | 顺序号 | NUMBER(19) | NOT NULL |  | 主键 |
| APP_ID | 应用ID | VARCHAR2(20) | NULL |  |  |
| CODE | 菜单编码 | VARCHAR2(50)| NOT NULL |  | 唯一索引 |
| NAME | 菜单名称 | VARCHAR2(50)| NOT NULL |  |  |
| DESCRIPTION | 菜单描述 | VARCHAR2(255) | 	NULL |  |  |
| URI | ACTION的地址 | VARCHAR2(255) | NULL |  |  |
| HTTP_METHOD | HTTP请求方式 | VARCHAR2(10) | NULL |  | GET，POST |
| LOG_OPTION | 	日志记录选项  | NUMBER(10) | NULL |  | REQUEST_HEAD REQUEST_PARAM SESSION_ATTR REQUEST_ATTR之组合 |
| LOG_LEVEL | 日志记录级别 | VARCHAR2(10) | NULL|  | ANY：全部请求 LOGON：登录后的请求 ERROR：出错后的请求 |
| EFFECTIVE_TIME | 生效日期 | TIMESTAMP(6)| NULL |  |  |
| INACTIVE_TIME | 失效日期 | TIMESTAMP(6)| NULL |  |  |
| IS_GROUP | 是否分组 | NUMBER(1) | NOT NULL | 默认:0 |  |
| PARENT_ID | 分组父ID | NUMBER(19) | NULL |  | 外键 |
| ORDERED | 排序序号 | NUMBER(10) | NOT NULL | 默认:0 |  |
| CREATED_BY | 创建人 | VARCHAR2(50) | NOT NULL |  |  |
| CREATED_TIME | 创建时间 | TIMESTAMP | NOT NULL |  |  |
| LAST_UPDATED_BY | 最后更新人 | VARCHAR2(50) | NOT NULL |  |  |
| LAST_UPDATED_TIME | 	最后更新时间 | TIMESTAMP | NOT NULL |  | &nbsp; |

### 23.3.3 MA_BASE_ACL_ORG

**表 23.10. MA_BASE_ACL_ORG**

| 字段名称 | 中文名称 | 数据库字段类型 | 是否允许为空 | 默认值 | 备注 |
| -- | -- | -- | -- | -- | -- |
| ID | 顺序号 | NUMBER(19) | NOT NULL |  | 主键 |
| OA_ID | OA中的组织ID | NUMBER(19) | NOT NULL |  | 唯一索引 |
| APP_ID | 	应用ID | VARCHAR2(20) | NULL |  |  |
| CODE | 组织编码 | VARCHAR2(50) | NOT NULL|  | 唯一索引 |
| NAME | 组织名称 | VARCHAR2(50) | NOT NULL |  |  |
| SIMPLE_NAME | 组织简称| VARCHAR2(50) | NOT NULL |  |  |
| NICK_NAME | 组织昵称 | VARCHAR2(255) | NULL |  |  |
| PARENT_ID | 父组织ID | NUMBER(19) | NULL | OA的ID | 不建外键 |
| IS_GROUP | 是否分组 | NUMBER(1) | NOT NULL | 默认:1 |      |
| ORDERED | 排序 | NUMBER(10) | NOT NULL |  |  |
| LEADER_ACCOUNT | 	组织主管帐号 | VARCHAR2(255) | 	NULL |  |  |
| FOUND_DATE | 组织创建日期 | DATE | NOT NULL |  |  |
| ORG_LEVEL | 组织级别 |NUMBER(10)| NOT NULL | 默认:0 |  |
| ORG_TYPE | 组织类型 | VARCHAR2(2) | NOT NULL |  | 'HO'：总部用户；'B0'：分公司用户；'S0'：服务中心用户；'HC'：货仓用户 |
| IS_ASSIGNABLE | 是否可分配 | NUMBER(1) | NOT NULL | 默认:1 |  |
| ENABLED | 是否有效 | NUMBER(1) | NOT NULL | 默认:1 |  |
| CREATED_BY | 创建人 | VARCHAR2(50) | NOT NULL |  |  |
| CREATED_TIME | 创建时间 | TIMESTAMP | NOT NULL |  |  |
| LAST_UPDATED_BY | 最后更新人 | VARCHAR2(50) | NOT NULL |  |  |
| LAST_UPDATED_TIME | 最后更新时间 | TIMESTAMP | NOT NULL |  |  |

### 23.3.4 MA_BASE_ACL_PROVIDER_DEF

**表 23.11. MA_BASE_ACL_PROVIDER_DEF**

| 字段名称 | 中文名称 | 数据库字段类型 | 是否允许为空 | 默认值 | 备注 |
| -- | -- | -- | -- | -- | -- |
| ID | 顺序号 | NUMBER(19) | NOT NULL |  | 主键 |
| APP_ID | 	应用ID | VARCHAR2(20) | NULL |  |  |
| NAME | 名称 | VARCHAR2(20) | NOT NULL |  | 唯一索引 |
| GROUP_NAME | 分类 | VARCHAR2(20) | NOT NULL |  | CATALOG_PROVIDER :分组提供者 RESOURCE_PROVIDER :资源提供者 |
| PROTOCOL | 协议 | VARCHAR2(20) | NOT NULL |  | HESSIAN BURLAP JSON_REST |
| URI | 地址 | VARCHAR2(255) | NULL |  |  |
| USER_NAME | 用户名 | VARCHAR2(50) | NULL |  |  |
| PASSWORD | 密码 | VARCHAR2(50) | NULL | | |
| CREATED_BY | 创建人 | VARCHAR2(50) | NOT NULL |  |  |
| CREATED_TIME | 创建时间 | TIMESTAMP | NOT NULL |  |  |
| LAST_UPDATED_BY | 最后更新人 | VARCHAR2(50) | NOT NULL |  |  |
| LAST_UPDATED_TIME | 最后更新时间 | TIMESTAMP | NOT NULL |  |  |

## 23.4 业务策略

### 23.4.1 MA_BASE_ACL_BIZ_RULE

**表 23.12. MA_BASE_ACL_BIZ_RULE**\\

| 字段名称 | 中文名称 | 数据库字段类型 | 是否允许为空 | 默认值 | 备注 |
| -- | -- | -- | -- | -- | -- |
| ID | 顺序号 | NUMBER(19) | NOT NULL |  | 主键 |
| CODE | 业务规则编码 | VARCHAR2(50) | NOT NULL |  | 唯一索引 |
| NAME | 业务规则名称 | VARCHAR2(50) | NOT NULL |  |  |
| APP_ID | 应用ID | VARCHAR2(20) | NULL |  |  |
| EXP_TEXT | 业务规则表达式 | CLOB | NULL |  |  |
| IS_GROUP | 是否分组 | NUMBER(1) | NOT NULL | 默认:0 |  |
| PARENT_ID | 分组父ID | NUMBER(19) | NULL |  | 外键 |
| CREATED_BY | 创建人 | VARCHAR2(50) | NOT NULL |  |  |
| CREATED_TIME | 创建时间 | TIMESTAMP | NOT NULL |  |  |
| LAST_UPDATED_BY | 最后更新人 | VARCHAR2(50) | NOT NULL |  |  |
| LAST_UPDATED_TIME | 最后更新时间 | TIMESTAMP | NOT NULL |  |  |

### 23.4.2 MA_BASE_ACL_USER_RULE

**表 23.13. MA_BASE_ACL_USER_RULE**

| 字段名称 | 中文名称 | 数据库字段类型 | 是否允许为空 | 默认值 | 备注 |
| -- | -- | -- | -- | -- | -- |
| ID | 顺序号 | NUMBER(19) | NOT NULL |  | 主键 |
| CODE | 用户规则编码 | VARCHAR2(50) | NOT NULL |  | 唯一索引 |
| NAME | 用户规则名称 | VARCHAR2(50) | NOT NULL |  |  |
| 0:5 | 1:5 | 2:5 | 3:5 | 4:5 | 5:5 |
| 0:6 | 1:6 | 2:6 | 3:6 | 4:6 | 5:6 |
| 0:7 | 1:7 | 2:7 | 3:7 | 4:7 | 5:7 |
| 0:8 | 1:8 | 2:8 | 3:8 | 4:8 | 5:8 |
| 0:9 | 1:9 | 2:9 | 3:9 | 4:9 | 5:9 |
| 0:10 | 1:10 | 2:10 | 3:10 | 4:10 | 5:10 |
| 0:11 | 1:11 | 2:11 | 3:11 | 4:11 | 5:11 |
| 0:12 | 1:12 | 2:12 | 3:12 | 4:12 | 5:12 |





