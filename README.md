

<div align=center><img src="https://github.com/ZYKJShadow/vue-asyncLoadJs/blob/master/ScreenShots/shadow_logo.png" width=250 heigh=250 ></div><br>


<div align=center>
 <img src="https://camo.githubusercontent.com/b07168720c736b9a308a82f7ba5502f37e491779/68747470733a2f2f696d672e736869656c64732e696f2f636972636c6563692f70726f6a6563742f6769746875622f7675656a732f7675652f6465762e7376673f73616e6974697a653d74727565" >
 <img src="https://camo.githubusercontent.com/9680910106d8b2169bb62b6ddb2e8d7b1136d3ff/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7675652e7376673f73616e6974697a653d74727565">

<img src="https://img.shields.io/badge/author-shadow-lightgrey">
</div><br>

<h2 align=center> Vue-asyncLoadJS</h2><br>


> 做项目可能会遇到这种情况：我们需要引入url地址的JS，实现了这个功能还会有一个问题，当你不关闭浏览器的情况下使用路由功能多次访问这个页面时，由于挂载了动态加载JS的方法，因此会导致script标签不停的地叠加，假如有某个用户进行了上述操作，你的页面将被script标签撑爆，本项目致力于解决此问题


## 环境准备
### 组件安装
```Shell
npm install q --save
```
### 文件创建
为方便后续的全局引用，请在src目录下新建一个loadResource.js文件`文件名非强制`

## Vue动态加载JS（无路由）
`注意：此方法适用于无路由功能的情况，适用路由功能的移步至下文`

```JavaScript
//引入Q
const Q = require('q');

/**
 *
 * @param url 导入js的url地址
 * @returns {*} export此函数方便全局调用
 */
export default function asyncLoadJs(url,id) {

    return Q.Promise((resovle, reject) => {

        //创建script标签
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = id;
        //添加标签到body尾部
        document.body.appendChild(script);

        script.onload = () => {
            resovle();
        };
        script.onerror = () => {
            reject();
        }
    })
}
```
## Vue动态加载JS（有路由）

```JavaScript
//引入Q
const Q = require('q');

/**
 *
 * @param url 导入js的url地址
 * @param id  script标签的id（必须保证唯一性）
 * @returns {*} export此函数方便全局调用
 */
export default function asyncLoadJs(url, id) {

    return Q.Promise((resovle, reject) => {
        let srcArr = document.getElementsByTagName('script');
        let hasLoaded = false;
        for (let i = 0; i < srcArr.length; i++) {
            hasLoaded = srcArr[i].src === url;
            // 如果找到了重复的js标签将它删除
            if (hasLoaded) {
                document.getElementById(id).remove();
            }
        }

        //创建script标签,并为此标签添加ID
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = id;
        //添加标签到body尾部
        document.body.appendChild(script);

        script.onload = () => {
            resovle();
        };
        script.onerror = () => {
            reject();
        }
    })
}

```
## 全局引入

在main.js中添加`注：文件名需要与之前自己定义的js文件名前缀一致，prototype后面必须要加$，见示例`
```JavaScript
//动态引入js
import asyncLoadJs from "@/loadResources";
Vue.prototype.$asyncLoadJs = asyncLoadJs;
```

## 使用示例
在mounted方法中`参数一：url地址 参数二：id（必须保证唯一性，建议使用js文件的前缀名）`
```JavaScript
mounted() {
 //无路由引用
 this.$asyncLoadJs("http://v.bootstrapmb.com/2020/2/c85i87390/plugins/dropify/dropify.min.js");
 
 //有路由引用
 this.$asyncLoadJs("http://v.bootstrapmb.com/2020/2/c85i87390/plugins/dropify/dropify.min.js","dropify");
},
```
