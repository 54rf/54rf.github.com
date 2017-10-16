// 自己的工具库

//基础工具
var Util = {
    support: {
        touch: "ontouchend" in document,
        localStorage: function () { // 判断是否支持localStorage
            var testKey = 'test', storage = window.sessionStorage;
            try {
                storage.setItem(testKey, '1');
                storage.removeItem(testKey);
                return localStorageName in win && win[localStorageName];
            }
            catch (error) {
                return false;
            }
        }
    },
    //第三方插件加载器，loading为加载中的事件，loaded为加载完成后的callback，noAutoAppend为非自动加载
    vendorLoader: function (url, loading, loaded, noAutoAppend) {
        var node = document.createElement('script');
        if ('function' === typeof loading) {
            loading();
        }
        node.setAttribute('type', 'text/javascript');
        node.setAttribute('src', url);
        node.setAttribute('async', true);
        node.onload = node.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
                if ('function' === typeof loaded) {
                    loaded();
                }
                node.onload = node.onreadystatechange = null;
            }
        };
        if (!noAutoAppend) {
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(node);
        }
    }
    , alert: function (txt) {
        alert(txt);
    }
    , isString: function (t) {
        return Object.prototype.toString.call(t) === '[object String]' ? true : false;
    }
    , isDate: function (t) {
        return Object.prototype.toString.call(t) === '[object Date]' ? true : false;
    }
    , fillWithZero: function (n) {
        if (n < 10 && n > 0) {
            n = "0" + n;
        }
        return n;
    }
    , dateFormat: function (dateTime) {
        dateTime = this.isDate(dateTime) ? dateTime : (this.isString(dateTime) ? new Date(dateTime) : undefined );
        if (dateTime) {
            return dateTime.getFullYear() + '.' + this.fillWithZero(1 + parseInt(dateTime.getMonth())) + '.' + this.fillWithZero(dateTime.getDate()) + ' ' + this.fillWithZero(dateTime.getHours()) + ':' + this.fillWithZero(dateTime.getMinutes());
        }
    }
    // 判断浏览器小于等于IE9
    , letIE9: function () {
        var UA = navigator.userAgent,
            isIE = UA.indexOf('MSIE') > -1,
            v = isIE ? /\d+/.exec(UA.split(';')[1]) : 10;
        return v <= 9;
    }
};

// ajax请求
var myTools_ajaxRequest = {
    //XMLHttpRequest对象
    getXhr: function () {
        // 1. 创建XMLHttpRequest空对象
        var xhr = null;//不占用内存空间
        // 2. 判断当前的浏览器
        if (window.XMLHttpRequest) {//其他浏览器
            xhr = new XMLHttpRequest();
        } else {//IE浏览器
            xhr = new ActiveXObject("Microsoft.XMLHttp");
        }
        // 3. 将XMLHttpRequest对象返回
        return xhr;
    },
    // 实现Ajax异步交互
    /*
     *opts参数是一个对象 { key : value }
     * 选项
     * method - 请求类型
     * url - 请求地址
     * data - 请求数据
     * callback - 请求成功后的回调函数
     */
    ajax: function (opts) {
        // 1. 创建核心对象
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHttp");
        }
        // 2. 建立连接
        xhr.open(opts.method, opts.url);
        // 3. 发送请求数据
        if (opts.method == "GET") {
            xhr.send(null);
        } else {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(opts.data);
        }
        // 4. 接收响应数据
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.responseText;
                opts.callback(result);
            }
        }
    }
};

