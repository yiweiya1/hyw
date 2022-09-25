const express=require("express");
const app=express()
const bodyParser=require('./tools/bodyParser')
// const path=require('path')
app.use(express.static('./static'))
// 所有请求都要通过bodyparser获取
app.use(bodyParser)
//首页界面获取接口
// 根服务器
const cookieParser = require('cookie-parser')
const {verifyToken} = require('./tools/jwt')

app.use(cookieParser())
app.use('/' , require('./router/index'))
app.use('/admin' ,verifyToken ,require('./router/admin'))

app.listen(3000)

// mvc架构
// model 数据库  view 视图  control操作
// 请求 control-》model-》view