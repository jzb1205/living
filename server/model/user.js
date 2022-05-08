const { sequelize, Sequelize } = require('../connect')

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.sync().then(() => {
  console.log('user模型同步成功')
})

module.exports = { User }