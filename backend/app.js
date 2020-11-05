const sequelize = require('./src/conexion');
const express = require('express');
const app = express();
app.use(express.json());
const usersRouter = require('./src/components/users');
const locationRouter = require('./src/components/location');

app.use('/', usersRouter);
app.use('/', locationRouter);


app.listen(3000, function () {
    console.log('Aplicación usuando el puerto 3000');
});