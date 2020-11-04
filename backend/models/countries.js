const { Schema, model } = require('mongoose');

const countries = new Schema({
    region_id: {type: Schema.ObjectId, ref: "regions", required: true},
    name: {type: String, required: true}
});

module.exports = model('countries', countries);