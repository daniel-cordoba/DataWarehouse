const mongoose = require('./src/conexion');
const express = require('express');
const app = express();
app.use(express.json());
const companies = require('./models/companies.js');
const ubicaciones = require('./models/ubicaciones.js');
const users = require('./models/users.js');
const regions = require('./models/regions');
const countries = require('./models/countries');

async function datosBase() {
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
    //REGIONES
    const region1 = {name: "Sudamerica"};
    const region2 = {name: "Norteamerica"};  
    function addRegion(region) {
        let addRegion = new regions(region);
        return addRegion.save()
            .then(resp=>{console.log(resp)})
            .catch(err=>{console.log(err)});
    }
    await addRegion(region1);
    await addRegion(region2);

    //PAISES
    const city1 = {region: "Sudamerica", country: "Argentina"};
    const city2 = {region: "Sudamerica", country: "Colombia"};
    const city3 = {region: "Norteamerica", country: "Mexico"};    
    const city4 = {region: "Norteamerica", country: "Estados Unidos"};   

    function addCountry(region, country){
        regions.findOne({name:region}).then(resp=>{
            console.log(resp._id);
            const city = {region_id:resp._id, name:country};
            let addCountry = new countries(city);
            addCountry.save().then(resp=>{
                console.log(resp);
            }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
    }

    addCountry(city1.region, city1.country);
    addCountry(city2.region, city2.country);
    addCountry(city3.region, city3.country);
    addCountry(city4.region, city4.country);


    /* const country1 = {
        region_id: sudamerica,
        name: "colombia"
    };
    console.log('222' + country1.region_id + 'y' + country1.name); */
    //COMPAÑIA
/*     const compania1 = {
        nombre:,
        direccion:,
        email:,
        telefono:,
        ciudad
    }; */
}
async function datosBase2() {
    await datosBase();
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