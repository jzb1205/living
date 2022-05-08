const { sequelize, Sequelize } = require('../connect')

const Menu = sequelize.define('menu', {
  path: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  pathName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  isPower: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  isShow: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  isBtn: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  parentId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  creator: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

Menu.sync().then(() => {
  console.log('Menu模型同步成功')
})

module.exports = { Menu }