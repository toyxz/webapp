const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcRoot = path.resolve(__dirname,'src');
const devPath = path.resolve(__dirname,'dev');
const pageDir = path.resolve(srcRoot,'page');
const mainFile = 'index.js';

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
function getEntry() {
    let entryMap = {};
    // 查找文件，文件拼合，主要是查看page目录下的每个目录下是否有index.js这个文件，如果有的话，需要作为入口文件
    fs.readdirSync(pageDir).forEach((pathname) => {
        let fullPathName = path.resolve(pageDir,pathname);
        let stat = fs.statSync(fullPathName);
        let fileName = path.resolve(fullPathName,mainFile);
        if (stat.isDirectory() && fs.existsSync(fileName)) {
            entryMap[pathname] = fileName;
        }
    })
    return entryMap;
}
const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);
module.exports = {
    mode: 'development',
    devServer: {
        contentBase: devPath
    },
    entry: entryMap,
    output: {
        path:devPath,
        filename:'[name].min.js'
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/,use: [{loader: 'babel-loader'}],include:srcRoot},
            {test: /\.css$/,use:['style-loader','css-loader'],include:srcRoot},
            {test: /\.scss$/,use:['style-loader','css-loader','sass-loader'],include:srcRoot},
            {test: /\.(png|jpg|jpeg)$/,use:'url-loader?limit=8192',include:srcRoot}
        ]
    },
    plugins: [
        
    ].concat(htmlArray)
}