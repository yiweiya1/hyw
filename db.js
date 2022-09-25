//用来连接数据库
const mongoose=require('mongoose');

const url="mongodb://localhost/boke";
mongoose.connect(url)

// 将连接好的数据库暴露出去
module.exports=mongoose;




