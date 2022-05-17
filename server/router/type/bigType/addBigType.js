const { bigType } = require('../../../model/bigType')

module.exports = async (req, res) => {
  const { bigTypeName, detail, creator } = req.body
  //检查库中是否已存在
  const isExist = await bigType.findOne({ where: { bigTypeName } })
  if (isExist) {
    res.status(201).send({
      msg: '该类型已存在',
      code: 201
    })
    return
  }
  const addData = await bigType.create({ bigTypeName, detail, creator })
  res.status(200).send({
    data: addData,
    msg: '创建成功',
    code: 200
  })
}