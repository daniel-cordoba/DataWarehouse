const { Schema, model } = require('mongoose');

const users = new Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    profile: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = model('users', users);