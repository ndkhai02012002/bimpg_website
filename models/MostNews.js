const mongoose = require("mongoose");

const MostNewsSchema = mongoose.Schema({
    list_id: Array
})

module.exports = mongoose.model('MostNews', MostNewsSchema, 'mostnews')