const { User } = require('../../model/user')

module.exports = async (req, res) => {
  const { username, password } = req.body
  console.log({ username, password })
  //检查库中是否已存在
  const isExist = await User.findOne({ where: { username } })
  console.log('isExist', isExist)
  if (isExist) {
    res.status(400).send({
      msg: '该用户名已经被注册',
      code: 400
    })
    return
  }
  const createUser = await User.create({ username, password })
  res.status(200).send({
    data: createUser,
    msg: '创建成功',
    code: 200
  })
}