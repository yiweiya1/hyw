var pageBox = document.getElementsByClassName('page_box')[0];
var pageTitle = pageBox.getElementsByClassName('page_title')[0];
var pageContent = pageBox.getElementsByClassName('page_content')[0];
var pageTime = pageBox.getElementsByClassName('page_time')[0];
var pageClassify = pageBox.getElementsByClassName('page_classify')[0]
var submitCommend = document.getElementsByClassName('submit_commend')[0]
var inputCommend = submitCommend.getElementsByClassName('input_commend')[0];
var submitBtn = submitCommend.getElementsByClassName('submit')[0]
var commendList = document.getElementsByClassName('commend_list')[0];
var commendListUl = document.getElementsByClassName('commend_list_ul')[0];

// 当前界面的id
var id = location.href.split('?')[1].split("=")[1]

// console.log(submitBtn)
// 提交按钮(有问题)
submitBtn.addEventListener('click', function () {
    var commend = inputCommend.value;
    // console.log(commend)
    myAjax('POST', '/submitCommend', { commendValue: commend, id }).then((data) => {
        alert(data)
        inputCommend.value = ""
        getData()
    })
})


function renderOneArticle(data) {
    var data = JSON.parse(data)[0];
    // console.log(data)
    pageTitle.innerText = data.title;
    pageContent.innerText = data.content;
    pageTime.innerText = data.time;
    pageClassify.innerText = data.classify;
}

function renderCommendData(e) {
    commendListUl.innerHTML=""
    var arr = JSON.parse(e);
    arr.forEach((item) => {
        var li = document.createElement("li");
        li.className = "commend_item"
        var span1 = document.createElement('span');
        var span2 = document.createElement('span');
        span1.innerText = item.commend;
        span2.innerText = item.date;
        li.appendChild(span1);
        li.appendChild(span2);
        commendListUl.appendChild(li)
    })
}

async function getData() {
    var oneArticleData = await myAjax("GET", "/getOneArticleById?id=" + id, null)
    renderOneArticle(oneArticleData)
    var commendData = await myAjax('GET', '/getCommendById?id=' + id, null)
    renderCommendData(commendData)
}


getData()

