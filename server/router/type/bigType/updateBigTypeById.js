
const { bigType } = require('../../../model/bigType')

module.exports = async (req, res) => {
  const { id, bigTypeName, detail, creator } = req.body
  await bigType.update({ bigTypeName, detail, creator }, {
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