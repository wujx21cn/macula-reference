# 表结构

## 23.1 应用管理

### 23.1.1. MA_BASE_APPLICATION

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
| 0:15 | 1:15 | 2:15 | 3:15 | 4:15 | 5:15 |
| 0:16 | 1:16 | 2:16 | 3:16 | 4:16 | 5:16 |
| 0:17 | 1:17 | 2:17 | 3:17 | 4:17 | 5:17 |
| 0:18 | 1:18 | 2:18 | 3:18 | 4:18 | 5:18 |
| 0:19 | 1:19 | 2:19 | 3:19 | 4:19 | 5:19 |
| 0:20 | 1:20 | 2:20 | 3:20 | 4:20 | 5:20 |
