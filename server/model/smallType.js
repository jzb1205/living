const { sequelize, Sequelize } = require('../connect')

const smallType = sequelize.define('smalltype', {
  smallTypeName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  detail: {
    type: Sequelize.STRING,
    allowNull: true
  },
  belongBigType: {
    type: Sequelize.STRING,
    allowNull: true
  },
  creator: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

smallType.sync().then(() => {
  console.log('smallType模型同步成功')
})

module.exports = { smallType }