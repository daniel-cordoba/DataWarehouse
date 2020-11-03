const { Schema, model } = require('mongoose');

const companias = new Schema({
    nombre: {type: String, required: true},
    direccion: {type: String, required: true},
    email: {type: Number, required: true},
    telefono: {type: String, required: true},
    ciudad: {type: String, required: true}
});

module.exports = model('companias', companias);