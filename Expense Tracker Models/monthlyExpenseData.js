const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const monthlyExpenseData = sequelize.define('monthlyexpense', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    finalMonthlyExpense: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    monthName:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    yearDigit:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    signupEmail:{
        type: Sequelize.STRING,
        allowNull:false
    }
});
module.exports = monthlyExpenseData;