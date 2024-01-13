const Router = require('@koa/router')
const { doLogin,userFind,doRegister } = require('../controllers/mysqlControl')
const jwt = require('jsonwebtoken')
const config = require('../secretConfig')
const router = new Router()

// 定义登录接口
router.post('/api/login', async (ctx) => {
    // 获取到前端传递的账号和密码，去数据库中校验账号密码的正确性
    const { username, password } = ctx.request.body
    try {
      const result = await doLogin(username, password)
      const findRes = await userFind(username)
      if (result.length) { // 账号密码存在
        const tokenstr = jwt.sign({id:result[0].id,usename:result[0].usename,email:result[0].email},config.secretkey,{expiresIn:config.expiresIn})
        const data = {
          id: result[0].id,
          email: result[0].email,
          username: result[0].username
        }
        ctx.body = {
          status:0,
          data: data,
          message: '登录成功!',
          token:'Bearer '+ tokenstr
        }
      }  
      else if (!findRes.length) { // 账号未注册
        ctx.body = {
          status: 1,
          data: 'error',
          message: '账号未注册，请先注册!'
        }
    }
       else {
        ctx.body = {
          status: 1,
          data: 'error',
          message: '账号或密码错误!'
        }
      }
    } catch (error) {
      ctx.body = {
        status: 1,
        data: error,
        message: '服务器异常!'
      }
    }
  })

// 定义注册接口
router.post('/api/register', async (ctx) => {
    // 拿到前端传过来的 username，email，password
    // 在数据库中校验 username 是否存在，如果不存在
    // 往数据库中植入一条新的数据
    const { username, email, password } = ctx.request.body
    if (!username || !password || !email) {
      ctx.body = {
        status: 1,
        message: '账号密码或昵称不能为空!'
      }
      console.log(username, email, password);
      return
    }
  
    try {
      const findRes = await userFind(username)
      if (findRes.length) { // 账号已存在
        ctx.body = {
          status: 1,
          data: 'error',
          message: '账号已存在!'
        }
        return
      }
      // 植入
      const registerRes = await doRegister([username,email,password])
      if (registerRes.affectedRows !== 0) {
        ctx.body = {
          status: 0,
          data: 'success',
          message: '注册成功!'
        }
      } else {
        ctx.body = {
          status: 1,
          data: 'error',
          message: '注册失败!'
        }
      }
    } catch (error) {
      ctx.body = {
        status: 1,
        data: error,
        message: '服务器异常!'
      }
    }
  
  })  

module.exports = router

