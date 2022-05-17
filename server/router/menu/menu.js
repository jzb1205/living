const { Menu } = require('../../model/menu')

module.exports = async (req, res) => {
  const menu = await Menu.findAll()
  res.status(200).send({
    data: menu,
    msg: '操作成功',
    code: 200
  })
}