const signUp = require('../sqModel/signUpData.js');
const bcrypt = require('bcrypt');
let dotenv = require('dotenv');
dotenv.config();
var jwt = require('jsonwebtoken');
exports.addSignUpData = (req, res, next) => {
    const { name2, email2, phone2, pwd2 } = req.body;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(pwd2, salt, function (err, hash) {
            if (err) {
                console.log('Unable to create new user');
                res.json({ message: 'Unable to create new user' });
            }
            signUp.create({
                name: name2,
                email: email2,
                phone: phone2,
                password: hash
            }).then((respg) => {
                console.log(respg);
                console.log('Added sign up details to the database');
                res.json({ status: "User successfully signed up" });
            }).catch(err => {
                console.log(err);
                console.log('Error in controller');
                res.json({ status: "User already exists, Please Login" });
            });
        });
    });
};

exports.addLogInData = (req, res, next) => {
    const email2 = req.body.email2;
    const password2 = req.body.pwd2;
    signUp.findByPk(email2).then((user) => {
        bcrypt.compare(password2, user.password, function (err, result) {
            if (err) {
                console.log(err);
                res.json({ success: false, message: 'Something went wrong' });
            }
            if (result) {
                var token = jwt.sign({ username: user.name, email: user.email }, process.env.SECRET_KEY, {
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