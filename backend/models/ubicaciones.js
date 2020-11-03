const { Schema, model } = require('mongoose');

const ubicaciones = new Schema({
    region: {type: Array, required: true},
});

module.exports = model('ubicaciones', ubicaciones);