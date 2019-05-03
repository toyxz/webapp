React组件化思想
 * 拆分
 * 分治
 * 复用

```js

                            |-----首页tab
        |--------外卖首页==========订单tab
        |                   |-----我的tab
        |
        |                   |-----点菜tab
美团外卖 --------店铺详情页----------评价tab
        |                   |-----商家tab
        |
        --------分类页
        |
        --------评价页
```

#### 环境搭建
1、创建环境
```npm init```
2、安装webpack
```npm install webpack --save```
--save 的意思是把依赖写在package.json中cd 

#### 设计项目初始架构
```js
|-src
|--component
|--page
|--json
|--static   
```
#### 创建webpack配置文件
webpack.config.dev.js
webpack.config.build.js

区别 webpack.config.build.js 一般都有代码的压缩和文件的替换等等操作，主要用在项目发布的过程中

webpack.config.dev.js主要用在开发过程中，可用热加载等

#### 配置命令
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    // 由于webpack是安装在本地的，所以需要这么配置命令
    "dev":"./node_modules/.bin/webpack --config webpack.config.dev.js" 
  },
```
#### 相关插件
```
html-webpack-plugin
```
#### 引入react
```js
react
react-dom
redux
react-reduc
redux-thunk
```

#### 大致入口
```js
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux'
import Main from './Main/Main.jsx'
ReactDOM.render(
    <Provider store={store}>
        <Main></Main>
    </Provider>,
    document.getElementById('root')
)
// 但是这样会报错，因为store还没有定义
```

>报错 Error: Plugin/Preset files are not allowed to export objects, only functions
解决：
原因是：babel中出现了两种版本，兼容性。
解决方法：
将 babel-preset-* 卸载，重新安装 @babel/preset-* ，并且修改 .babelrc 中的 presets
```
npm uninstall babel-preset-*
npm install @babel/preset-env @babel/preset-react
```
```
// .babelrc
{
    "presets": ["@babel/env","@babel/react"],
}
```

## 多页面的配置
```js
// 目的是page目录下每一个目录下的index.html模版都能对应出来dev目录下的对应文件（做到多出口）
function getHtmlArray(entryMap) {
    let htmlArray = [];
    Object.keys(entryMap).forEach((key) => {
        let fullPathName = path.resolve(pageDir,key);
        let fileName = path.resolve(fullPathName,key + '.html');
        if (fs.existsSync(fileName)) {
            htmlArray.push(new HtmlWebpackPlugin({
                filename: key + '.html',
                template: fileName,
                chunks: [key]
            }))
        }
    })
    return htmlArray;
}
```

## 关于redux
component通过dispatch触发action，action触发reducer进行状态变更从而通知store达到修改状态的目的

通过connect 可以将redux中的某些状态传到组件的props中

## 配置webpack-dev-server
```js
//  build之后的文件存放的目录
devServer: {
    contentBase: devPath
},
```
