const adminModel = require('../models/Admin')
const bcrypt = require('bcrypt')

const loginView = (req, res, next) => {
    res.sendFile('public/views/adminregister.html', {root: '.'})
}

const insertAdmin = (information) => {
    var newAdmin = new adminModel.Admin({
        username: information.username,
        password: information.password,
        created_date: Date.now()
    })

    newAdmin.save(function (err) {
        if (err) return console.error(err);
      });
}

const Register = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    let admin_ = await adminModel.Admin.findOne({username: username });
    if(admin_) res.json({status: "Admin already exists"})
    else {
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(password, salt)
        const information = {
            username: username,
            password: hash_password
        }
        await insertAdmin(information)

        res.json({status: "Register successful"})
    }
}

module.exports = {
    Register: Register,
    View: loginView
}