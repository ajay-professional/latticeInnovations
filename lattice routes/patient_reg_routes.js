const express = require('express');

const router = express.Router();

const patientRegController = require('../lattice controllers/patient_reg_cont.js');

router.post('/PatientDet', patientRegController.patRegDet);

router.post('/loginByUser', patientRegController.loginByUser);

router.get('/hospDetail/:hospId', patientRegController.hospDetail);

router.get('/psychDetail/:hospId', patientRegController.psychDetail);

module.exports = router;