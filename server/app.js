const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()

//参数解析
app.use(bodyParser.urlencoded({ extended: false }))//extended为false表示使用querystring来解析数据，这是URL-encoded解析器
app.use(bodyParser.json()) //json解析器

//跨域处理
app.use(cors())

//连接数据库
require('./connect')

//建模
require('./model/user')
require('./model/menu')
require('./model/bigType')
require('./model/smallType')
require('./model/expenseDetail')

//路由
const main = require('./router/main')
//为main匹配地址 /api
app.use('/api', main)

app.listen(8888, () => {
  console.log('服务已启动')
})
