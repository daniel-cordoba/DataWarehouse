const { Schema, model } = require('mongoose');

const cities = new Schema({
    country_id: {type: Schema.ObjectId, ref: "countries", required: true},
    name: {type: String, required: true}
});

module.exports = model('cities', cities);