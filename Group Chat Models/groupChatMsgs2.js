const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const groupChatMsgs2 = sequelize.define('groupChatMsgs2', {
    msgs: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type:Sequelize.STRING,
        allowNull:false
    },
    signupEmail:{
        type: Sequelize.STRING,
        allowNull:false
    },
    name_of_group:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});
module.exports = groupChatMsgs2;