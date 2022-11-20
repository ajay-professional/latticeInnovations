const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const sequelize=require('./util/database');

const sqRoutes = require('./sqRoutes/sqRoute.js');

const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(sqRoutes);

sequelize.sync({force:true}).then(() => {
    app.listen(9898);
}).catch(err => console.log(err));



