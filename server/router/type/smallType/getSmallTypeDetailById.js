
const { smallType } = require('../../../model/smallType')

module.exports = async (req, res) => {
  const { id } = req.body
  const list = await smallType.findOne({
    where: {
      id
    }
  })
  let obj = (list && list.dataValues) || {}
  if (obj.belongBigType) {
    obj.belongBigType = parseInt(obj.belongBigType)
  }
  res.status(200).send({
    data: obj,
    msg: '查询详情成功',
    code: 200
  })
}