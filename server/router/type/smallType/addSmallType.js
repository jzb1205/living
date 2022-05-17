const { smallType } = require('../../../model/smallType')

module.exports = async (req, res) => {
  const { smallTypeName, detail, belongBigType, creator } = req.body
  //检查库中是否已存在
  const isExist = await smallType.findOne({ where: { smallTypeName } })
  if (isExist) {
    res.status(201).send({
      msg: '该类型已存在',
      code: 201
    })
    return
  }
  const addData = await smallType.create({ smallTypeName, belongBigType, detail, creator })
  res.status(200).send({
    data: addData,
    msg: '创建成功',
    code: 200
  })
}