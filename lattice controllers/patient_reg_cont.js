const patReg = require('../lattice models/patient_reg_data.js');
const hosp_name = require('../lattice models/hospital_name.js');
const psych_name = require('../lattice models/psych_name.js');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let dotenv = require('dotenv');
dotenv.config();
exports.patRegDet = (req, res, next) => {
    const thename = req.body.thename;
    const addr = req.body.addr;
    const email2 = req.body.email2;
    const tel = req.body.tel;
    const pwd = req.body.pwd;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(pwd, salt, function (err, hash) {
            if (err) {
                console.log('Unable to create new user');
                return res.status(500).json({ message: 'Unable to create new user' });
            }
            patReg.create({
                thename,
                addr,
                email2,
                tel,
                pwd: hash
            }).then((resk) => {
                console.log(resk);
                console.log('Added Patient details to the database');
                res.status(200).json({
                    status: "Successfully updated"
                });
            }).catch(err => {
                console.log(err);
                console.log('Error in controller');
                res.status(400).json({
                    status: "patient already exists"
                });
            });
        });
    });
};


exports.loginByUser = (req, res, next) => {
    const email2 = req.body.email2;
    const password2 = req.body.password2;
    patReg.findByPk(email2).then((user) => {
        console.log(user);
        bcrypt.compare(password2, user.pwd, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(401).json({ success: false, message: 'passwords do not match' });
            }
            if (result) {
                var token = jwt.sign({ username: user.thename, email: user.email2 }, process.env.SECRET_KEY, {
                    expiresIn: "2d"
                });
                res.json({ status: "Login Successful", success: true, userData: { username: user.thename, email: user.email2, phone: user.tel }, token });
            } else {
                console.log('passwords do not match');
                res.sendStatus(401);
            }
        });
    }).catch(err => {
        console.log(err);
        console.log('user not exists');
        res.status(404).json({ success: false, message: 'User does not exists' });
    });
};

exports.hospDetail = (req, res, next) => {
    const hosp_id = req.params.hospId;
    hosp_name.findByPk(hosp_id).then((hosp) => {
        res.status(200).send(hosp);
    }).catch((err) => {
        console.log(err);
    })
};


exports.psychDetail = (req, res, next) => {
    const hosp_id = req.params.hospId;
    psych_name.findAll({
        where: {
            hospNameHospId: hosp_id
        }
    }).then((resp) => {
        res.status(200).send(resp);
    }).catch((err) => {
        console.log(err);
    })
};