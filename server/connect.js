// const Sequelize = require('sequelize')
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('living_expense', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306'
})

sequelize.authenticate().then(() => {
  console.log('数据库连接成功')
}).catch(() => {
  console.log('数据库连接失败')
})


//导出 创建模型需要
module.exports = {
  Sequelize,
  sequelize,
  DataTypes
}