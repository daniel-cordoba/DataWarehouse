const sequelize = require('./src/conexion');
const express = require('express');
const app = express();
app.use(express.json());
const usersRouter = require('./src/components/users')

app.use('/', usersRouter);


app.listen(3000, function () {
    console.log('Aplicación usuando el puerto 3000');
});