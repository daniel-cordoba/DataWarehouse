const sequelize = require('./src/conexion');
const express = require('express');
const app = express();
app.use(express.json());

const usersRouter = require('./src/components/users');
const locationRouter = require('./src/components/location');
const companiesRouter = require('./src/components/companies');

app.use('/', usersRouter);
app.use('/', locationRouter);
app.use('/', companiesRouter);

app.listen(3000, function () {
    console.log('Aplicación usuando el puerto 3000');
});