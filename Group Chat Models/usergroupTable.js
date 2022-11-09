const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const usergroupTable = sequelize.define('usergroupTable', {
    signupEmail:{
        type: Sequelize.STRING,
        allowNull:false
    },
    name_of_group:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = usergroupTable;
