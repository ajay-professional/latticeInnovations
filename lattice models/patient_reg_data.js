const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const patReg = sequelize.define('patReg', {
    thename: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    addr: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 10
        }
    },
    email2: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
        primaryKey: true
    },
    tel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pwd: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});


module.exports = patReg;