const Sequelize = require('sequelize');
require('dotenv').config();

const seq = new Sequelize('data_warehouse', process.env.U, process.env.P,
{
    dialect:'mariadb',
    host:'127.0.0.1'
});

seq.authenticate().then(()=>{
    console.log('Conectado a la base de datos');
}).catch(err=>{
    console.error(err);
});

module.exports = seq;