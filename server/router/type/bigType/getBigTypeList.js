
const { bigType } = require('../../../model/bigType')

module.exports = async (req, res) => {
  const { bigTypeName } = req.body
  console.log({ bigTypeName })
  //检查库中是否已存在
  const list = await bigType.findAll()
  res.status(200).send({
    data: list,
    msg: '获取大类列表成功',
    code: 200
  })
}