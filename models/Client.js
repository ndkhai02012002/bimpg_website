const mongoose = require('mongoose')

const ClientSchema = mongoose.Schema({
    fullname: String,
    email: String,
    contact: String,
    birth: Number,
    city: String,
    active: String,
    national: String,
    more: String
})

module.exports =  mongoose.model('Client', ClientSchema, 'clients')