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
| LAST_UPDATED_TIME | 最后更新时间 | TIMESTAMP | NOT NULL |  | |

### 23.1.2 MA_BASE_APP_INSTANCE

**表 23.2. MA_BASE_APP_INSTANCE**

| 字段名称 | 中文名称 | 数据库字段类型 | 是否允许为空 | 默认值 | 备注 |
| -- | -- | -- | -- | -- | -- |
| ID | 顺序号 | NUMBER(19) | NOT NULL |  |  |
| 0:3 | 1:3 | 2:3 | 3:3 | 4:3 | 5:3 |
| 0:4 | 1:4 | 2:4 | 3:4 | 4:4 | 5:4 |
| 0:5 | 1:5 | 2:5 | 3:5 | 4:5 | 5:5 |
| 0:6 | 1:6 | 2:6 | 3:6 | 4:6 | 5:6 |
| 0:7 | 1:7 | 2:7 | 3:7 | 4:7 | 5:7 |
| 0:8 | 1:8 | 2:8 | 3:8 | 4:8 | 5:8 |
| 0:9 | 1:9 | 2:9 | 3:9 | 4:9 | 5:9 |
| 0:10 | 1:10 | 2:10 | 3:10 | 4:10 | 5:10 |


