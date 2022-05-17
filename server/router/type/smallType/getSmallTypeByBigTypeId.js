
const { smallType } = require('../../../model/smallType')

module.exports = async (req, res) => {
  const { bigTypeId } = req.body
  const list = await smallType.findAll({ where: { belongBigType: bigTypeId } })
  res.status(200).send({
    data: list,
    msg: '获取大类列表成功',
    code: 200
  })
}