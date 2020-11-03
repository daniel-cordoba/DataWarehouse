const mongoose = require('./src/conexion');
const express = require('express');
const app = express();
app.use(express.json());
const companies = require('./models/companies.js');
const ubicaciones = require('./models/ubicaciones.js');
const users = require('./models/users.js');

function datosBase() {
    //USUARIO
    const user = {
        name: 'admin',
        lastName: 'admincito',
        email: 'admin@admin.com',
        profile: 'administrador',
        password: '1234'
    }
    let addAdmin = new users(user);
    addAdmin.save().then(resp=>{
        console.log(resp);
    }).catch(err=>{
        console.log(err);
    });
    //UBICACION
    const ubicacion1 = {        
        region: {
            "sudamerica": {
                "argentina": {
                        "bue": "Buenos Aires",
                        "cor": "Córdoba"
                },
                "colombia": {
                        "bog": "Bogotá",
                        "med": "Medellín"
                }
            }
        }     
    } 
    const ubicacion2 = {
        region: {
            "norteamerica": {
                    "mexico": {
                        "cdx": "Ciudad de México",
                        "tij": "Tijuana"
                    }
            }   
        }
    } 

    function addUbicacion(ubicacion) {
        let addUbicacion = new ubicaciones(ubicacion);
    addUbicacion.save().then(resp=>{
        console.log(resp);
    }).catch(err=>{
        console.log(err);
    });
    }
    addUbicacion(ubicacion1);
    addUbicacion(ubicacion2);
    //COMPAÑIA
/*     const compania1 = {
        nombre:,
        direccion:,
        email:,
        telefono:,
        ciudad
    }; */
}
datosBase();

app.put('/',(req,res)=>{
    ubicaciones.find().then(resp=>{
        /* console.log(resp);
        resp.plato=req.body.plato;
        resp.precio=req.body.precio;
        resp.tipo=req.body.tipo;
        resp.save(); */
        res.status(200).json(resp);
    }).catch(err=>{
        res.status(500).json(err);
    });
});

app.listen(3000, function () {
    console.log('Aplicación usuando el puerto 3000');
});