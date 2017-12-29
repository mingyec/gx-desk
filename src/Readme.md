# 系统功能代码区

## assets
存放静态资源如图片等

## components
存放通用组件

## fetch
http请求部分

## icons
存放icon图标
- svg 存放从[阿里巴巴矢量图库](http://www.iconfont.cn/)下载下来的icon.svg

## lang
中英文转化部分
- en.js 英文包
- zh.js 中文包

## router
全局路由配置
- import_development.js 开发环境下的路由加载方式
- import_production.js 生产环境下的路由加载方式

## store
全局状态管理（vuex）

## styles
全局样式管理
**注意：**如新建样式文件则必须手动在`index.scss`导入

## utils
工具包
- index.js 存放常用工具方法
- storage.js 缓存管理
- task.js 线程管理

## views
视图文件区，与路由一一对应

## 重要部分
- App.vue 系统视图入口
- main.js 系统程序入口，全局属性与函数管理
