# 项目构建

## 3.1 SVN项目创建

在项目启动后，需按项目情况，构建svn版本库，并按系统架构分析出的业务模块，构建项目子业务模块。

在项目命名后，在svn中构建路径trunk，tags，branches，用来进行版本控制。

例如macula平台的svn库目录为：

![macula-svn-path.jpg](macula-svn-path.jpg "macula-svn-path.jpg")

对项目的开发代码，主要在trunk中开发，在项目开发发布版本后，将通过标签以及branches的方式，记录历史版本，具体的svn操作信息请查看svn的使用指南，这里仅介绍基本的代码结构规划。

## 3.2 Maven及目录结构

