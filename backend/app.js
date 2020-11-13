const sequelize = require('./src/conexion');
const express = require('express');
const app = express();
app.use(express.json());
const helmet = require('helmet');

const usersRouter = require('./src/components/users');
const locationRouter = require('./src/components/location');
const companiesRouter = require('./src/components/companies');
const contactsRouter = require('./src/components/contacts');
const channelsRouter = require('./src/components/channels');

app.use(helmet.permittedCrossDomainPolicies({permittedPolicies: "by-content-type"}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
    next();
});

app.use('/', usersRouter);
app.use('/', locationRouter);
app.use('/', companiesRouter);
app.use('/', contactsRouter);
app.use('/', channelsRouter);

app.listen(3000, function () {
    console.log('Aplicación usuando el puerto 3000');
});