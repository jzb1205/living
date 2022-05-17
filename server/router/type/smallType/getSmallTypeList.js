
const { smallType } = require('../../../model/smallType')
const { bigType } = require('../../../model/bigType')

module.exports = async (req, res) => {
  const { smallTypeName } = req.body
  const smallTypeList = await smallType.findAll()
  res.status(200).send({
    data: smallTypeList,
    msg: '获取小类列表成功',
    code: 200
  })
}