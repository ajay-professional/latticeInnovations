const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const signUpData = sequelize.define('signUpData', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull:false
    }
});
module.exports = signUpData;

