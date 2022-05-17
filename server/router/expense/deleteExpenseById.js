const { expense } = require('../../model/expense')

module.exports = async (req, res) => {
  const { id } = req.body
  await expense.destroy({
    where: {
      id
    }
  })
  res.status(200).send({
    data: '',
    msg: '删除成功',
    code: 200
  })
}