const koa = require('koa')
const app = new koa()
const bodyParser = require('koa-bodyparser') 
const user = require('./router/user')
const config = require('./secretConfig')
app.use(bodyParser())

const cors = require('koa2-cors') // 解决跨域
app.use(cors()) // 告诉浏览器允许跨域


const koaJwt = require('koa-jwt');
app.use(koaJwt({secret: config.secretkey}).unless({path: [/\/api/]}))// 配置白名单

app.use(user.routes(), user.allowedMethods())

app.listen(8080,()=>{
    console.log('http://127.0.0.1:8080 服务器启动成功！')
})