const { Schema, model } = require('mongoose');

const regions = new Schema({
    name: {type: String, required: true}
});

module.exports = model('regions', regions);