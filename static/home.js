
var article = document.getElementsByClassName('article')[0];
var articleTitle = article.getElementsByClassName('article_title')[0];
var articleClassify = article.getElementsByClassName('article_classify')[0];
var articleContent = article.getElementsByClassName('article_content')[0];
var articleTime = article.getElementsByClassName('article_time')[0];
var articleContinue = article.getElementsByClassName('article_continue')[0]
var newArticle = document.getElementsByClassName('new_article')[0];
var newArtcileList = newArticle.getElementsByClassName('new_article_list')[0];
var newArticlePage = newArticle.getElementsByClassName('new_article_page')[0];
var hot = document.getElementsByClassName('hot')[0];
var hotList = hot.getElementsByClassName('hot_list')[0];
var commend = document.getElementsByClassName('commend')[0];
var commendList = commend.getElementsByClassName('commend_list')[0];
var headerLogin=document.getElementsByClassName("header_login")[0];

headerLogin.addEventListener("click",function(){
    location.href="./admin/"
})


function renderGetArticle(e) {
    var item = JSON.parse(e)[0] //对象
    // console.log(item)
    articleTitle.innerHTML = item.title;
    articleContent.innerHTML = item.content.slice(0, 100) + '...';
    articleClassify.innerHTML = item.classify;
    articleTime.innerHTML = item.time;
    articleContinue.setAttribute("id",item._id)
    articleContinue.addEventListener("click",function(){
        var id=this.getAttribute('id')
        var url="http://localhost:3000/getPage?="+id;
        location.href=url;
        // console.log(url)
    })
}

function renderHotList(e) {
    var list = JSON.parse(e)
    list.forEach((item, index) => {
        var li = document.createElement("li");
        li.className = "hot_item";
        li.innerText = item.title;
        hotList.appendChild(li)
        li.setAttribute("id",item._id)
        li.addEventListener("click",function(){
            var id=this.getAttribute("id")
            var url="http://localhost:3000/getPage?id="+id;
            location.href=url;
        })
    })
}
function renderNewCommend(e) {
    var list = JSON.parse(e)
    list.forEach((item, index) => {
        var li = document.createElement("li");
        li.className = "commend_item";
        li.innerText = item.commend;
        commendList.appendChild(li)
        li.setAttribute("id",item.formId)
        li.addEventListener("click",function(){
            var id=this.getAttribute("id")
            var url="http://localhost:3000/getPage?id="+id;
            location.href=url;
        })
    })
}
function renderArticleNums(e) {
    var length = Math.ceil(parseInt(e) / 5);
    for (var i = 1; i <= length; i++) {
        var li = document.createElement('li');
        li.className = 'pages';
        li.innerHTML = i;
        li.addEventListener('click', function () {
            var num = this.innerText;
            myAjax("GET", "/getNewArticleList?page="+num, null).then((result)=>{
                renderNewArticleList(result)
            })
        })
        newArticlePage.appendChild(li)
    }
}

function renderNewArticleList(e) {
    newArtcileList.innerHTML=""
    var list = JSON.parse(e)
    list.forEach((item, index) => {
        var li = document.createElement("li");
        li.className = 'items';
        li.innerHTML = item.title;
        newArtcileList.appendChild(li)
        // console.log(item)
        li.setAttribute("id",item._id)
        li.addEventListener("click",function(){
            var id=this.getAttribute("id")
            var url="http://localhost:3000/getPage?id="+id;
            location.href=url;
        })
    })

}

async function getData() {
    var getArticleData = await myAjax('GET', "./getArticle", null);
    renderGetArticle(getArticleData)
    var getHotData = await myAjax('GET', "/getHotArticleList", null);
    renderHotList(getHotData)
    var newCommendData = await myAjax('GET', '/getNewCommendList', null);
    renderNewCommend(newCommendData)
    var articleNumsData = await myAjax('GET', '/ArticleNums', null);
    renderArticleNums(articleNumsData)
    var newArtcileList = await myAjax("GET", "/getNewArticleList?page=1", null);
    renderNewArticleList(newArtcileList)
}
getData()
// 首页文章部分填充
// myAjax('GET', '/getArticle', null).then((result) => {
//     //前后端交流的时候只能用字符串
//     var item = JSON.parse(result)[0] //对象
//     articleTitle.innerHTML = item.title;
//     articleContent.innerHTML = item.content.slice(0, 100) + '...';
//     articleClassify.innerHTML = item.classify;
//     articleTime.innerHTML = item.time;
// }).catch((err) => {
//     console.log(err)
// })
//热度文章部分填充
// myAjax('GET', '/getHotArticleList', null).then((result) => {
//     var list = JSON.parse(result)
//     list.forEach((item,index)=>{
//         var li=document.createElement("li");
//         li.className="hot_item";
//         li.innerText=item.title;
//         hotList.appendChild(li)
//     })
// }).catch((err) => {
//     console.log(err)
// })
//最新评论的填充
// myAjax('GET', '/getNewCommendList', null).then((result) => {
//     var list = JSON.parse(result)
//     list.forEach((item,index)=>{
//         var li=document.createElement("li");
//         li.className="commend_item";
//         li.innerText=item.commend;
//         commendList.appendChild(li)
//     })
// }).catch((err) => {
//     console.log(err)
// })
// 分页按钮部分填充
// myAjax("GET","/ArticleNums",null).then((result)=>{
//     var length=Math.ceil(parseInt(result)/5);
//     for(var i=1;i<=length;i++){;
//         var li=document.createElement('li');
//         li.className='pages';
//         li.innerHTML=i;
//         newArticlePage.appendChild(li)
//     }
// }).catch((then)=>{
//     console.log(err)
// })
// 最新文章界面部分的填充
// myAjax("GET","/getNewArticleList?page=1",null).then((result)=>{
//     var list=JSON.parse(result)
//     list.forEach((item,index)=>{
//         var li=document.createElement("li");
//         li.className='items';
//         li.innerHTML=item.title;
//         newArtcileList.appendChild(li)
//     })
// }).catch((then)=>{
//     console.log(err)
// })