const url = require('url')
const queryString = require('querystring')
function bodyParser(req,res,next){
    if(req.method=="GET"){
        var {query}=url.parse(req.url)     // query:"wd=123456&uu=12&ii=88"
        req.body=queryString.parse(query)   //{wd:123,uu:22,ii:88}
        next()
    }
    if(req.method == 'POST'){
        var str = ""
        req.on('data' , (chunk)=>{
            str+=chunk
        })
        req.on('end' , ()=>{
           req.body = JSON.parse(str)
           next()
        })
    }
// 1解析get请求发送过来的数据
//http：//localhost：3000/s？wd=123456&uu=12&ii=88
// 2.解析post发来的请求

}

module.exports=bodyParser