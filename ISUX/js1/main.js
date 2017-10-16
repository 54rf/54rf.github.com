/**
 * Created by maolvxiao on 2016/9/7.
 */
// MODULE: 获取公共元素
var nav_mask = document.getElementsByClassName('nav-mask')[0];


// MODULE: 右侧菜单栏显示/隐藏（width小于1149显示)
var nav_center_menuBtn = document.getElementsByClassName("nav-center-menuBtn")[0];
var nav_center_menu = document.getElementsByClassName('nav-center-menu')[0];
nav_center_menuBtn.addEventListener('click', function () {
    var className = nav_center_menu.className;
    if (className == "nav-center-menu"
        || className == "nav-center-menu close"
    ) {
        // 显示遮罩层
        nav_mask.className = 'nav-mask open';
        // 显示菜单栏
        nav_center_menu.className = 'nav-center-menu open';
        // 改变菜单操作按钮
        nav_center_menuBtn.className = 'nav-center-menuBtn open'
    } else {
        nav_mask.className = 'nav-mask close';
        nav_center_menu.className = 'nav-center-menu close';
        nav_center_menuBtn.className = 'nav-center-menuBtn close'
    }
});
nav_mask.addEventListener('click', function () {
    nav_mask.className = 'nav-mask close';
    nav_center_menu.className = 'nav-center-menu close';
    nav_center_menuBtn.className = 'nav-center-menuBtn close'
});


// MODULE: 开始搜索/取消搜索（大屏下）
var nav_left = document.getElementsByClassName('nav-left')[0];
var nav_center = document.getElementsByClassName('nav-center')[0];
var nav_right = document.getElementsByClassName('nav-right')[0];
var nav_right_search = document.getElementsByClassName('nav-right-search')[0];
nav_right_search.addEventListener('click', function () {
    var className = nav_right.className;
    if (className == 'nav-right cancelSearch'
        || className == 'nav-right'
    ) {
        // 显示遮罩层
        nav_mask.className = 'nav-mask open';
        // 移动搜索按钮/隐藏分隔线/隐藏简繁体转换标识文字
        nav_right.className = 'nav-right startSearch';
        // 隐藏中间logo（width小于1149生效）
        nav_left.className = 'nav-left startSearch';
        // 隐藏右边菜单标志
        nav_center.className = 'nav-center startSearch';
        // 输入框获取焦点
        document.forms['nrshForm01'].nrsfInputBox.focus();
    } else {
        nav_mask.className = 'nav-mask close';
        nav_right.className = 'nav-right cancelSearch';
        nav_left.className = 'nav-left cancelSearch';
        nav_center.className = 'nav-center cancelSearch';
    }
});
nav_mask.addEventListener('click', function () {
    nav_mask.className = 'nav-mask close';
    nav_right.className = 'nav-right cancelSearch';
    nav_left.className = 'nav-left cancelSearch';
    nav_center.className = 'nav-center cancelSearch';
});

// ajax请求--页面数据加载
var banner_bgImg = document.getElementsByClassName('banner-bgImg')[0];
var banner_bg_title = document.getElementsByClassName('banner-bg-title')[0];
var banner_bg_info_avatar = document.getElementsByClassName('banner-bg-info-avatar')[0];
var banner_bg_info_author = document.getElementsByClassName('banner-bg-info-author')[0];
var banner_bg_info_postDate = document.getElementsByClassName('banner-bg-info-postDate')[0];
var banner_bg_category = document.getElementsByClassName('banner-bg-category')[0];
var article_container = document.getElementsByClassName('article-container')[0];
var article_loadMore = document.getElementsByClassName('article-loadMore')[0];
var article_loadingImg = document.getElementsByClassName('article-loadingImg')[0];
var opts = {
    method: 'get',
    url: 'json/testData.json',
    callback: function (result) {
        // json字符串转化为json对象
        var result = eval('(' + result + ')');
        // 服务器获取banner部分所需数据
        var data_forBanner = result.data_forBanner;
        // 服务器获取article部分所需数据
        var data_forArticle = result.data_forArticle;
        // 计算article部分数据长度
        var data_forArticle_len = data_forArticle.length;
        console.log(data_forArticle_len);

        // MODULE：banner模块数据渲染
        var banner_dataLoad = function () {
            // 文章图
            banner_bgImg.style.background = "url(img1/banner/" + data_forBanner.img[0] + ") no-repeat center";
            banner_bgImg.style.backgroundSize = 'cover';
            // 文章标题
            banner_bg_title.innerHTML = data_forBanner.title;
            // 作者头像
            banner_bg_info_avatar.src = "img1/head_portrait/" + data_forBanner.avatar;
            // 作者名称
            banner_bg_info_author.innerHTML = data_forBanner.author;
            // 文章发表日期
            banner_bg_info_postDate.innerHTML = data_forBanner.postDate;
            // 文章归类
            var banner_category = '';
            for (var i in data_forBanner.category) {
                banner_category += "<span title=\"\">" + data_forBanner.category[i] + "</span>";
            }
            banner_bg_category.innerHTML = banner_category;
        };
        banner_dataLoad();

        // MODULE: article部分页面数据渲染
        // article模块数据渲染--定义公共变量、方法
        // 定义并初始化已加载页面数
        var page = 0;
        // 定义并初始化待渲染（innerHtml）字符串
        var article = '';
        // 定义首次加载和加载更多公共方法
        var article_loadOperate = function (j) {
            // 先获取文章分类字符串，待用
            var article_category = '';
            for (var k in data_forArticle[j].category) {
                article_category += "<span title=\"\">" + data_forArticle[j].category[k] + "</span>";
            }
            // 先获取文章图片，待
            var article_item_img =
                "<img1 class=\"article-item-img1\" alt=\"文章配图\" src=\"img1/for_artical_cover/" + data_forArticle[j].img[0] +
                "\" srcset=\"" +
                "img1/for_artical_cover/" + data_forArticle[j].img[0] +" 600w,"+
                "img1/for_artical_cover/" + data_forArticle[j].img[1] +" 310w,"+
                "img1/for_artical_cover/" + data_forArticle[j].img[2] +" 590w,"+
                "img1/for_artical_cover/" + data_forArticle[j].img[3] +" 630w,"+
                "img1/for_artical_cover/" + data_forArticle[j].img[4] +" 768w,"+
                "img1/for_artical_cover/" + data_forArticle[j].img[5] +" 770w,"+
                "img1/for_artical_cover/" + data_forArticle[j].img[6] +" 1140w"+
                "\" sizes=\"(max-width: 600px) 100vw, 600px\">";
            // 获取文章部分字符串
            article +=
                "<li class=\"article-item\">" +
                "<a class=\"article-item-img1-container\" href=\"javascript:;\">" + article_item_img + "</a>" +
                "<h2 class=\"article-item-title\">" + data_forArticle[j].title + "</h2>" +
                "<p class=\"article-item-info\">" +
                "<img1 class=\"article-item-info-avatar\" src=\"img1/head_portrait/" + data_forArticle[j].avatar + "\" alt=\"头像\">" +
                "<span class=\"article-item-info-author\">" + data_forArticle[j].author + "</span>" +
                "<span class=\"article-item-info-postDate\">" + data_forArticle[j].postDate + "</span>" +
                "</p>" +
                "<p class=\"article-item-category\">" + article_category + "</p>" +
                "</li>"
        };

        // article模块数据渲染--首页数据加载
        var article_firstLoad = function () {
            for (var j = 0; j <= 23; j++) {
                article_loadOperate(j);
            }
            article_container.innerHTML = article;
        };
        article_firstLoad();

        // article模块数据渲染--点击"加载更多"加载
        // 特别说明：article沿用首页加载后数据
        var article_loadMore_f = function () {
            // 加载中显示菊花图标、隐藏点击按钮
            article_loadMore.className = 'article-loadMore none';
            article_loadingImg.className = 'article-loadingImg block';
            for (var j = 24 + 12 * page; j <= 24 + 12 * page + 11; j++) {
                // 数据加载完毕判断
                if (j >= data_forArticle_len) {
                    // 移出’加载更多‘点击事件绑定
                    article_loadMore.removeEventListener('click', article_loadMore_f);
                    // 最后一次数据加载（没有下面这条语句，最后一次数据不足12条时不会加载）
                    article_container.innerHTML = article;
                    // 最后一次加载完隐藏菊花图标、显示点击按钮
                    article_loadMore.className = 'article-loadMore';
                    article_loadingImg.className = 'article-loadingImg none';
                    // 改变点击按钮内文字
                    article_loadMore.innerHTML = '加载完毕';
                    return;
                }
                article_loadOperate(j);
            }
            article_container.innerHTML = article;
            // 加载完隐藏菊花图标、显示点击按钮
            article_loadMore.className = 'article-loadMore';
            article_loadingImg.className = 'article-loadingImg none';
            // 更新当前已加载页面数
            page++;
        };
        article_loadMore.addEventListener('click', article_loadMore_f);
    }

};
// 调用ajax异步加载所需数据
myTools_ajaxRequest.ajax(opts);



















