var left = document.getElementsByClassName('left')[0];
var addArticle = left.getElementsByClassName('add_article')[0];
var controlArticle = left.getElementsByClassName('control_article')[0];
var right = document.getElementsByClassName('right')[0];
var article = right.getElementsByClassName('article')[0];
var list = right.getElementsByClassName('list')[0];
var inputTitle = article.getElementsByClassName('input_title')[0];
var inputClassify = article.getElementsByClassName('input_classify')[0];
var inputContent = article.getElementsByClassName('input_content')[0];
var inputSubmit = article.getElementsByClassName('input_submit')[0];
var listUl = list.getElementsByClassName('list_ul')[0];

function renderAllArticle(e) {
    listUl.innerHTML = ""
    var arr = JSON.parse(e)
    arr.forEach((item) => {
        var li = document.createElement("li");
        var span = document.createElement('span');
        var button = document.createElement("button");
        button.innerText = "删除"
        span.innerText = item.title;
        li.className = "list_item"
        span.className = 'item_title'
        button.className = "item.delete"
        button.setAttribute('id', item._id)
        button.onclick = function () {
            var id = this.getAttribute('id')
            myAjax('POST', '/admin/deleteArticle', { id }).then((result) => {
                alert(result)
                getData()
            })

        }
        li.appendChild(span)
        li.appendChild(button)
        listUl.appendChild(li)

    })
}
// 让两个界面切换
addArticle.addEventListener("click", function () {
    this.className = "add_article active"
    controlArticle.className = "control_article"
    list.style.zIndex = "0"
    article.style.zIndex = "100"
})
controlArticle.addEventListener("click", function () {
    this.className = 'control_article active'
    addArticle.className = "add_article"
    list.style.zIndex = "100"
    article.style.zIndex = "0"
})

// 1.点击按钮
// 2.获取数据内容
// 3.发送内容
// 4.获取响应结果
inputSubmit.addEventListener('click', function () {
    var title = inputTitle.value;
    var content = inputContent.value;
    var classify = inputClassify.value;
    console.log(title, content, classify)
    myAjax("POST", "/admin/addArticle", { title, content, classify }).then((result) => {
        alert(result)
        inputTitle.value = "";
        inputContent.value = "";
        inputClassify.value = "";
        getData()
        console.log(result)
    })
})



async function getData() {
    var allArticle = await myAjax('GET', '/admin/getAllArticle', null)
    renderAllArticle(allArticle)
}
getData()