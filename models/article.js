const mongoose=require('../db')

var Article=mongoose.Schema(
    {
        title:String,   //文章标题
        content:String,     //稳住内容
        time:String,        //文章创建的时间
        classify:String,     //文章的分类
        count:Number        //文章的点击次数
    }
)
var article=mongoose.model('article',Article);


// console.log(new Date().toLocaleString())

module.exports=article
