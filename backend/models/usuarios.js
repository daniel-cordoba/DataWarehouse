const { Schema, model } = require('mongoose');

const usuarios = new Schema({
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    email: {type: Number, required: true},
    perfil: {type: String, required: true},
    contrasenia: {type: String, required: true}
});

module.exports = model('usuarios', usuarios);