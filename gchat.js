const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const sequelize = require('./util/database');
const SignUp = require('./Group Chat Models/signupData.js');
const groupChatMsgs=require('./Group Chat Models/groupChatMsgs.js');
const groupChatMsgs2=require('./Group Chat Models/groupChatMsgs2.js');
const usergroupTable = require('./Group Chat Models/usergroupTable.js');
const groupTable=require('./Group Chat Models/groupTable.js');
const expRoutes = require('./Group Chat Routers/routesGroupChat.js');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(expRoutes);

SignUp.hasMany(groupChatMsgs);
groupChatMsgs.belongsTo(SignUp);

SignUp.hasMany(groupChatMsgs2);
groupChatMsgs2.belongsTo(SignUp);

groupTable.hasMany(groupChatMsgs2);
groupChatMsgs2.belongsTo(groupTable);

SignUp.belongsToMany(groupTable, { through: usergroupTable});
groupTable.belongsToMany(SignUp, { through: usergroupTable});

sequelize.sync({force:true}).then(result => {
    console.log(result);
    app.listen(5040);
}).catch(err => console.log(err));