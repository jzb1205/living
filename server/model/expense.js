const { sequelize, Sequelize } = require('../connect')

const expense = sequelize.define('expense', {
  expenseItem: {
    type: Sequelize.STRING,
    allowNull: false
  },
  money: {
    type: Sequelize.STRING,
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
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  creator: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

expense.sync().then(() => {
  console.log('expense模型同步成功')
})

module.exports = { expense }