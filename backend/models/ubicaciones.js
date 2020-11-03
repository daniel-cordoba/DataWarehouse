const { Schema, model } = require('mongoose');

const ubicaciones = new Schema({
    region: {type: Object, required: true}
});

module.exports = model('ubicaciones', ubicaciones);