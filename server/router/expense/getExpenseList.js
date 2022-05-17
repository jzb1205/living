
const { expense } = require('../../model/expense')
const { Op } = require("sequelize");
const dayjs = require('dayjs')

module.exports = async (req, res) => {
  const { money, bigTypeId, smallTypeId, creator, date } = req.body

  const queryParams = {}
  if (creator) {
    queryParams.creator = creator
  }
  if (bigTypeId) {
    queryParams.bigTypeId = bigTypeId
  }
  if (smallTypeId) {
    queryParams.smallTypeId = smallTypeId
  }
  if (date.length > 0) {
    if (date[0] && date[1] && new Date(date[0]).getTime() > new Date(date[1]).getTime()) {
      var temp = date[0]
      date[0] = date[1]
      date[1] = temp
    }
    if (!date[0]) {
      date[0] = dayjs(new Date())
      date[0] = `${date[0].$y}-${date[0].$M + 1 < 10 ? '0' + (date[0].$M + 1) : date[0].$M + 1}-${date[0].$D < 10 ? '0' + (date[0].$D) : date[0].$D}`
    } else {
      date[0] = dayjs(date[0])
      date[0] = `${date[0].$y}-${date[0].$M + 1 < 10 ? '0' + (date[0].$M + 1) : date[0].$M + 1}-${date[0].$D < 10 ? '0' + (date[0].$D) : date[0].$D}`
    }
    if (!date[1]) {
      date[1] = dayjs(new Date())
      date[1] = `${date[1].$y}-${date[1].$M + 1 < 10 ? '0' + (date[1].$M + 1) : date[1].$M + 1}-${date[1].$D + 1 < 10 ? '0' + (date[1].$D + 1) : date[1].$D + 1}`
    } else {
      date[1] = dayjs(date[1], 'YYYY-MM-DD')
      date[1] = `${date[1].$y}-${date[1].$M + 1 < 10 ? '0' + (date[1].$M + 1) : date[1].$M + 1}-${date[1].$D + 1 < 10 ? '0' + (date[1].$D + 1) : date[1].$D + 1}`
    }
    queryParams.date = {
      [Op.between]: date
    }
  }
  // console.log('params', params)
  //检查库中是否已存在
  const list = await expense.findAll({
    where: queryParams,
    order: [['date', 'DESC']]
  })
  let allMoney = 0
  list.forEach(it => {
    allMoney += +it.money
  })
  allMoney = allMoney.toFixed(2)
  res.status(200).send({
    data: {
      list,
      allMoney
    },
    msg: '获取大类列表成功',
    code: 200
  })
}