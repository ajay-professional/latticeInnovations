const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const psych_name = sequelize.define('psych_name', {
    psych_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    psych_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pat_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
    
});

module.exports = psych_name;