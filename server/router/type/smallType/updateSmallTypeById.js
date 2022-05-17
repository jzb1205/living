
const { smallType } = require('../../../model/smallType')

module.exports = async (req, res) => {
  const { id, smallTypeName, belongBigType, detail, creator } = req.body
  await smallType.update({ smallTypeName, belongBigType, detail, creator }, {
    where: {
      id
    }
  });
  res.status(200).send({
    data: '',
    msg: '修改成功',
    code: 200
  })
}