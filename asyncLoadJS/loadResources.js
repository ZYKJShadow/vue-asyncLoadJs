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

export function loadCss(url) {
    let css = document.createElement('link');
    css.href = url;
    css.rel = 'stylesheet';
    css.type = 'text/css';
    document.head.appendChild(css);
}
