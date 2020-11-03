const mongoose = require('./src/conexion');
const express = require('express');
const app = express();
app.use(express.json());
const companias = require('./models/companias.js');
const ubicaciones = require('./models/ubicaciones.js');
const usuarios = require('./models/usuarios.js');

app.get('/', (req, res)=>{
    console.log('Holi');
    usuarios.find().then(resp=>{
        console.log(resp);
        res.status(200).json(resp);
    }).catch(err=>{
        res.status(500).json(err);
    });

});

app.listen(3000, function () {
    console.log('Aplicación usuando el puerto 3000');
});