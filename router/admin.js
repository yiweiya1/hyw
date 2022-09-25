// 登陆成功才能访问到这个界面
const express = require('express');
const router = express.Router()
const path = require('path');
const article = require('../models/article')
router.use(express.static("./static"))
const commend = require("../models/commend")


router.get("/", (req, res) => {
    res.sendFile(path.resolve("./static/write.html"))
})
// 获取所有文章
router.get('/getAllArticle', (req, res) => {
    // console.log(21231)
    article.find({}).then((result) => {
        res.send(result)
    })
})
// 删除文章
router.post('/deleteArticle', (req, res) => {
    var { id } = req.body;
    article.deleteOne({ _id: id }).then((data) => {
        commend.deleteMany({ formid: id }).then(() => {
            res.send('删除成功')
        })
    }).catch((err) => {
        res.send("删除失败")
    })

})
// 添加文章
router.post('/addArticle', (req, res) => {
    var { title, content, classify } = req.body;
    console.log(title, content, classify)
    var a = new article({
        title: title,
        content: content,
        classify: classify,
        time: new Date().toLocaleString(),
        count: 0
    })
    a.save().then(() => {
        res.send("文章插入成功")
    }).catch(
        () => { res.send("文章插入失败") }
    )
})
module.exports = router