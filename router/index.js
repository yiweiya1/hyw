const express=require("express")
const path=require("path")
const router=express.Router()
const article=require("../models/article")
const commend = require('../models/commend')
var {generatorToken} = require('../tools/jwt')
// 首页获取页面的接口
router.get("/",(req,res)=>{
    res.sendFile(path.resolve("./static/home.html"))
})
// 负责发送最新的一篇文章的数据给浏览器
router.get('/getArticle' , (req,res)=>{
    article.find({}).sort({time : -1}).limit(1).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})
// 热度文章列表
router.get("/getHotArticleList",(req,res)=>{
    article.find({}).sort({count:-1}).limit(5).then((result)=>{
        // console.log(result)
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })
})
// 最新文章列表
router.get('/getNewCommendList' , (req,res)=>{
    commend.find({}).sort({date:-1}).limit(5).then((data)=>{
        res.send(data)
        // console.log(data)
    }).catch((err)=>{
        res.send(err)
    })
})
// 根据页面的标号 获取最新的五篇文章
router.get('/getNewArticleList' , (req,res)=>{
    var {page}=req.body
    // console.log(page)
    article.find({}).sort({time:-1}).limit(5).skip((page-1)*5).then((data)=>{
        res.send(data)
        // console.log(data)
    }).catch((err)=>{
        res.send(err)
    })
})
// 用于获取文章的数量，以此来实现标号
router.get('/ArticleNums' , (req,res)=>{
    article.find({}).then((data)=>{
        res.send(`${data.length}`)
        // console.log(data.length)
    }).catch((err)=>{
        res.send(err)
    })
})


// 文章界面接口

// 只用来发送文章给游览器
router.get("/getPage",(req,res)=>{
    // console.log(req.body)
    res.sendFile(path.resolve("./static/page.html"))
})

// 用于发送文章的内容
router.get('/getOneArticleById' , (req,res)=>{
    var {id} = req.body
    article.find({_id : id}).then((result)=>{
        res.send(result)
        // console.log(result)
    }).catch((err)=>{
        res.send(err)
    })
})
//接受评论并保存到数据库(有问题)
router.post('/submitCommend' , (req,res)=>{
    var {commendValue,id} = req.body;
    // console.log(req.body)
    var c = new commend({
        commend : commendValue,
        date : new Date().toLocaleString(),
        formId : id
    })
    c.save().then(()=>{
        res.send('评论成功')
    }).catch(()=>{
        res.send('评论失败')
    })
})

// 获取全部的评论
router.get("/getCommendById",(req,res)=>{
    var {id}=req.body;
    commend.find({formId:id}).then((result)=>{
        res.send(result)
    })
})

// 登陆界面
router.get('/loginPage' , (req,res)=>{
    res.sendFile(path.resolve('./static/login.html'))
})
router.post('/login' , (req,res)=>{
    var {username,password} = req.body;
    if(username == 'admin' && password == '123'){
        console.log(username,password)
        // 进行加密
        var token = generatorToken({username,password})
        res.cookie('token' , token);
        res.send('登录成功')
    }
})
module.exports=router