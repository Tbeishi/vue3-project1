const db = require('../config/index')

// 连接mysql
const allService = {
    query: function(sql, values) {
      // pool 连接
      return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
          if (err) {
            reject(err)
          } else {
            // 执行sql语句
            connection.query(sql, values, (err, rows) => {
              if (err) {
                reject(err)
              } else {
                resolve(rows)
              }
              connection.release()  // 释放连接
            })
          }
        })
      })
    }
  }

//登录
const doLogin = (username,password)=>{
    const sqlStr=`select * from user where username="${username}" and password="${password}";`
    return allService.query(sqlStr)
}

// 注册
const doRegister = (values) => { //  values == [username, email,password]
    let _sql = `insert into user set username=?,email=?,password=?;`
    return allService.query(_sql, values)
}

// 查询
const userFind = (username) => {
    let _sql = `select * from user where username="${username}";`
    return allService.query(_sql)
  }
module.exports = {
    doLogin,
    doRegister,
    userFind
}
