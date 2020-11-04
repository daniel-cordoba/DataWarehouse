const { Schema, model } = require('mongoose');

const companies = new Schema({
    name: {type: String, required: true},
    adress: {type: String, required: true},
    email: {type: Number, required: true},
    phone: {type: String, required: true},
    city: {type: String, required: true}
});

module.exports = model('companies', companies);