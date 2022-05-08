const { sequelize, Sequelize } = require('../connect')

const bigType = sequelize.define('bigtype', {
  bigTypeName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  detail: {
    type: Sequelize.STRING,
    allowNull: true
  },
  creator: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

bigType.sync().then(() => {
  console.log('bigType模型同步成功')
})

module.exports = { bigType }