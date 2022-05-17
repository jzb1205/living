
const { bigType } = require('../../../model/bigType')

module.exports = async (req, res) => {
  const { id } = req.body
  await bigType.destroy({
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