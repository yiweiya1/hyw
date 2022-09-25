// 点击管理员页面--登陆权限---有/没有 重定向---添加文章页面

// jwt处理

//登陆
var usernameInput = document.getElementsByClassName('username')[0];
var passwordInput = document.getElementsByClassName('password')[0];
var loginBtn = document.getElementsByClassName('login')[0]

//点击登录按钮
//获取用户名+密码
//发送ajax请求

loginBtn.addEventListener('click' , function(){
    var username = usernameInput.value;
    var password = passwordInput.value;
    myAjax('POST' , '/login' , {username,password}).then((result)=>{
        console.log(result)
    })
})