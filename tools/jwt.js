// 引入一个jwt
const jwt = require('jsonwebtoken');
// 生成一个密钥
const secretKey = '27312013sfndjanfadlfjnlakdfjdlfsd';
function generatorToken(e){
    const token = jwt.sign(e,secretKey , {
        expiresIn : 3600
    })
    return token
}
// 秒作为单位 超过这个时间失效


// 验证token函数
function verifyToken(req,res,next){
    const {token} = req.cookies;  //
    jwt.verify(token , secretKey , (err,result)=>{
         if(err){
             res.redirect('/loginPage'); //登录页面
         }else{
             next()
         }
    })
}

module.exports = {
    generatorToken,
    verifyToken
}