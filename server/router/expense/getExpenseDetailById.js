
const { expense } = require('../../model/expense')

module.exports = async (req, res) => {
  const { id } = req.body
  const list = await expense.findOne({
    where: {
      id
    }
  })
  res.status(200).send({
    data: (list && list.dataValues) || {},
    msg: '查询详情成功',
    code: 200
  })
}