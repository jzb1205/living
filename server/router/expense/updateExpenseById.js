
const { expense } = require('../../model/expense')

module.exports = async (req, res) => {
  const { id, expenseItem, money, bigTypeId, bigTypeName, smallTypeId, smallTypeName, detail, creator, date } = req.body
  console.log(money)
  await expense.update({ expenseItem, money, bigTypeId, bigTypeName, smallTypeId, smallTypeName, detail, creator, date }, {
    where: {
      id
    }
  });
  res.status(200).send({
    data: '',
    msg: '修改成功',
    code: 200
  })
}