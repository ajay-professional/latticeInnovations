const SignUp = require('../Group Chat Models/signupData.js');
const groupChatMsgs = require('../Group Chat Models/groupChatMsgs.js');
const groupTable = require('../Group Chat Models/groupTable.js');
const usergroupTable = require('../Group Chat Models/usergroupTable.js');
let dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { response } = require('express');
exports.addSignUpDetailsInDatabase = (req, res, next) => {
    const { username, email, phone, password } = req.body;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                console.log('Unable to create new user');
                return res.json({ message: 'Unable to create new user' });
            }
            SignUp.create({
                username,
                email,
                phone,
                password: hash
            }).then((result) => {
                console.log('Added Product to the database');
                console.log(result);
                res.json({
                    status: "Successfully signed up"
                });
            }).catch(err => {
                console.log(err);
                console.log('Error in controller');
                res.json({
                    status: "User already exists, Please Login"
                });
            });
        });
    });
};

exports.loginByUser = (req, res, next) => {
    const email2 = req.body.email2;
    const password2 = req.body.password2;
    SignUp.findByPk(email2).then((user) => {
        bcrypt.compare(password2, user.password, function (err, result) {
            if (err) {
                console.log(err);
                res.json({ success: false, message: 'Something went wrong' });
            }
            if (result) {
                var token = jwt.sign({ username: user.username, email: user.email }, process.env.SECRET_KEY, {
                    expiresIn: "2d"
                });
                res.json({ status: "Login Successful", success: true, userData: { username: user.username, email: user.email, phone: user.phone, ispremiumuser: user.ispremiumuser }, token });
            } else {
                console.log('passwords do not match');
                res.sendStatus(401);
            }
        });
    }).catch(err => {
        console.log(err);
        console.log('Error in controller login');
        res.sendStatus(404);
    });
};

exports.authenticateUser = (req, res, next) => {
    try {
        const token = req.header('authorization');
        console.log(token);
        const userDet = jwt.verify(token, process.env.SECRET_KEY);
        console.log(JSON.stringify(userDet));
        myusername = userDet.username;
        mymail = userDet.email;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false })
    }
};

exports.groupChatMessage = (req, res, next) => {
    const msgs = req.body.msgs;
    groupChatMsgs.create({
        msgs: msgs,
        username: myusername,
        signupEmail: mymail
    }).then(groupChatMsgs => {
        console.log(groupChatMsgs);
        res.json(groupChatMsgs);
    }).catch(err => {
        console.log(err);
    });
};

exports.groupChatDOM = (req, res, next) => {
    usergroupTable.findAll({where:{signupEmail:mymail}}).then(groupChatMsgs => {
        console.log(groupChatMsgs);
        res.send(groupChatMsgs);
    }).catch(err => {
        console.log(err);
    });
};

exports.addGroupNameInDatabase = (req, res, next) => {
    const groupName = req.body.groupName;
    groupTable.create({
        name_of_group: groupName
    }).then(groupTable => {
        console.log(groupTable);
        res.json(groupTable);
        usergroupTable.create({
            signupEmail:mymail,
            name_of_group:groupName
        }).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.domChatMessage = (req, res, next) => {
    groupChatMsgs.findAll({ where: { signupEmail: mymail } }).then(groupChatM => {
        res.send(groupChatM);
    }).catch(err => {
        console.log(err);
    });
};

exports.addGroupMember= (req, res, next) => {
    let member_mail=req.body.member_mail;
    let group_name=req.body.group_name;
    SignUp.findAll({ where: { signupEmail: member_mail } }).then(()=> {
        usergroupTable.create({
            signupEmail:member_mail,
            name_of_group:group_name
        }).then(res=>{
            console.log(res);
            res.send("User added successfully !");
        }).catch(err=>{
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
        res.send("User does not exist !");
    });
};

exports.domAllChatMessages = (req, res, next) => {
    groupChatMsgs.findAll().then(groupChatM => {
        console.log(groupChatM);
        res.json(groupChatM);
    }).catch(err => {
        console.log(err);
    });
};

exports.domValidateEmailId = (req, res, next) => {
    groupChatMsgs.findAll().then(groupChatM => {
        console.log(groupChatM);
        res.json({ usermail: `${mymail}`});
    }).catch(err => {
        console.log(err);
    });
};
