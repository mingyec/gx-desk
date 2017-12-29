# gx-desk-v4

> 采用Vue-cli脚手架构建，运行该项目需要node环境

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 注意
1. 开发环境下http请求依赖其它服务端程序（默认指向10主机gx-desk），如需修改请在`config/index.js`里按照以下方式修改
```
module.export = {
    dev: {
        ...
        proxyTable: {
            '/rest': {
                target: 'http://192.168.1.10:8080/gx-desk/rest',  //在此指向目标程序
                changeOrigin: true,
                pathRewrite: {
                    '^/rest': '/'
                }
            }
        },
        ...
    }
}
```
2. 开发环境下配置了eslint，配置规则在根目录下的`.eslintrc.js`
3. 开发环境建议使用vscode编辑器
4. 项目如需添加新的开源库，请明确以下两种操作
    - 仅在开发环境使用：`npm i --save-dev your_lib_name`
    - 通用：`npm i --save your_lib_name`

5. 项目提交代码请忽略以下文件
    - node_modules
    - dist
    - .gitignore
