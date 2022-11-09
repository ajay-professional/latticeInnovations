const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const groupTable = sequelize.define('groupTable', {
    name_of_group: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = groupTable;