const { expense } = require('../../model/expense')

module.exports = async (req, res) => {
  const { expenseItem, money, bigTypeId, bigTypeName, smallTypeId, smallTypeName, detail, creator, date } = req.body

  const addData = await expense.create({ expenseItem, money, bigTypeId, bigTypeName, smallTypeId, smallTypeName, detail, creator, date })

  res.status(200).send({
    data: addData,
    msg: 'εε»Ίζε',
    code: 200
  })
}