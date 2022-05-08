const { sequelize, Sequelize } = require('../connect')

const expenseDetail = sequelize.define('expensedetail', {
  expenseItem: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  money: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  bigTypeId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  bigTypeName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  smallTypeId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  smallTypeName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  detail: {
    type: Sequelize.STRING,
    allowNull: true
  },
  creator: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

expenseDetail.sync().then(() => {
  console.log('expenseDetail模型同步成功')
})

module.exports = { expenseDetail }