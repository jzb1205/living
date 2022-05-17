const express = require('express')
const deleteBigTypeById = require('./type/bigType/deleteBigTypeById')

const main = express.Router()


main.post('/register', require('./user/register'))
//菜单
main.post('/menu', require('./menu/menu'))
//大类
main.post('/getBigTypeList', require('./type/bigType/getBigTypeList'))
main.post('/addBigType', require('./type/bigType/addBigType'))
main.post('/deleteBigTypeById', require('./type/bigType/deleteBigTypeById'))
main.post('/updateBigTypeById', require('./type/bigType/updateBigTypeById'))
main.post('/getBigTypeDetailById', require('./type/bigType/getBigTypeDetailById'))
//小类
main.post('/getSmallTypeList', require('./type/smallType/getSmallTypeList'))
main.post('/addSmallType', require('./type/smallType/addSmallType'))
main.post('/deleteSmallTypeById', require('./type/smallType/deleteSmallTypeById'))
main.post('/updateSmallTypeById', require('./type/smallType/updateSmallTypeById'))
main.post('/getSmallTypeDetailById', require('./type/smallType/getSmallTypeDetailById'))
main.post('/getSmallTypeByBigTypeId', require('./type/smallType/getSmallTypeByBigTypeId'))
//消费项
main.post('/getExpenseList', require('./expense/getExpenseList'))
main.post('/addExpense', require('./expense/addExpense'))
main.post('/deleteExpenseById', require('./expense/deleteExpenseById'))
main.post('/updateExpenseById', require('./expense/updateExpenseById'))
main.post('/getExpenseDetailById', require('./expense/getExpenseDetailById'))

module.exports = main