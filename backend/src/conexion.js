const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/data_warehouse', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
module.exports = mongoose;