
const { bigType } = require('../../../model/bigType')

module.exports = async (req, res) => {
  const { id } = req.body
  const list = await bigType.findOne({
    where: {
      id
    }
  })
  console.log('list', id, list.dataValues)
  res.status(200).send({
    data: (list && list.dataValues) || {},
    msg: '查询详情成功',
    code: 200
  })
}