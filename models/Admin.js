const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    username: String,
    password: String,
    created_date: Date
})

var Admin = mongoose.model('Admin', AdminSchema, 'admins')

module.exports.Admin = Admin