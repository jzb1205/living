
const { smallType } = require('../../../model/smallType')

module.exports = async (req, res) => {
  const { id } = req.body
  await smallType.destroy({
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