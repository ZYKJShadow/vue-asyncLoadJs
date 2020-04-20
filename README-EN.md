

<div align=center><img src="http://47.100.126.168/group1/M00/00/00/rBEZ7l6cFGSAVfC9AABjk9TPlZE462.png" width=250 heigh=250 ></div><br>


<div align=center>
 <img src="https://camo.githubusercontent.com/b07168720c736b9a308a82f7ba5502f37e491779/68747470733a2f2f696d672e736869656c64732e696f2f636972636c6563692f70726f6a6563742f6769746875622f7675656a732f7675652f6465762e7376673f73616e6974697a653d74727565" >
 <img src="https://camo.githubusercontent.com/9680910106d8b2169bb62b6ddb2e8d7b1136d3ff/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f7675652e7376673f73616e6974697a653d74727565">

<img src="https://img.shields.io/badge/author-shadow-lightgrey.svg">
</div><br>

<h2 align=center> Vue-asyncLoadJS</h2><br>


> You may encounter this kind of situation of the project: you need to import from the url address of JS and only need to use in a component when imported, it has a problem, after achieve this function when you do not close the browser use routing functions under the condition of multiple access to this page, due to mount the dynamic loading JS method, thus causes a script tag to increase constantly, if have a user for the operation, fill your pages will be script tags, this project is committed to solve the problem


## Environment
### Installation Component
```Shell
npm install q --save
```
### Create a file
To facilitate subsequent global references, create a new loadresource-js file in the SRC directory `filename unforced`

## Vue loads the JS file dynamically（Use without router）

```JavaScript
//import Q
const Q = require('q');

/**
 *
 * @param url The url address of JS
 * @returns {*} 
 */
export default function asyncLoadJs(url,id) {

    return Q.Promise((resovle, reject) => {

        //create script label
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = id;
        //Add label to body
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
## Vue loads the JS file dynamically（Use with router）

```JavaScript
//import Q
const Q = require('q');

/**
 *
 * @param url The url address of JS
 * @param id  The id of the script tag）
 * @returns {*} 
 */
export default function asyncLoadJs(url, id) {

    return Q.Promise((resovle, reject) => {
        let srcArr = document.getElementsByTagName('script');
        let hasLoaded = false;
        for (let i = 0; i < srcArr.length; i++) {
            hasLoaded = srcArr[i].src === url;
            // Delete the duplicate js tag if it is found
            if (hasLoaded) {
                document.getElementById(id).remove();
            }
        }

        //Create a script tag and add an ID to this tag
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = id;
        ////Add label to body
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
## Global import

Add in main.js
```JavaScript
import asyncLoadJs from "@/loadResources";
Vue.prototype.$asyncLoadJs = asyncLoadJs;
```

## Example
In the mounted method
```JavaScript
mounted() {
 //no router
 this.$asyncLoadJs("http://v.bootstrapmb.com/2020/2/c85i87390/plugins/dropify/dropify.min.js");
 
 //router
 this.$asyncLoadJs("http://v.bootstrapmb.com/2020/2/c85i87390/plugins/dropify/dropify.min.js","dropify");
},
```
