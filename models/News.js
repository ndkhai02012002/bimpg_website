const mongoose = require("mongoose");

const NewsSchema = mongoose.Schema({
    title: String,
    elements: Object,
    created_date: Date,
})

module.exports = mongoose.model('News', NewsSchema, 'news')