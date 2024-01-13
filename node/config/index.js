const mysql = require('mysql2')

//创建线程池
const db = mysql.createPool({
     //数据库配置
    host:'127.0.0.1',
    user: 'root',
    password: '18170758184fp',
    database:'ev_user',
})

module.exports = db