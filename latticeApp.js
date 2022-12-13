const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const sequelize = require('./util/database');

const lattRoutes = require('./lattice routes/patient_reg_routes.js');
const hosp_name = require('./lattice models/hospital_name.js');
const psych_name = require('./lattice models/psych_name.js');

const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(lattRoutes);

psych_name.belongsTo(hosp_name, { constraints: true, onDelete: 'CASCADE' });
hosp_name.hasMany(psych_name);



sequelize.sync().then(result => {
    console.log(result);
    app.listen(6611);
}).catch(err => console.log(err));