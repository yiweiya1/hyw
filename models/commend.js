const mongoose=require('../db')

var Commend=mongoose.Schema({
    commend:String, //评论的内容
    date:String,//评论创建的时间
    formId:String, //来源于那一篇文章的id
})
var commend=mongoose.model('commend',Commend)


module.exports=commend