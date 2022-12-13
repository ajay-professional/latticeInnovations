const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const hosp_name = sequelize.define('hosp_name', {
    hosp_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    hosp_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    psych_totalCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    pat_totalCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});


module.exports = hosp_name;