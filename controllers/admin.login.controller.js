const adminModel = require('../models/Admin')
const bcrypt = require('bcrypt')


const loginView = (req, res, next) => {
    res.sendFile('public/views/adminlogin.html', {root: '.'})
}

const Login = async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    let admin_ = await adminModel.Admin.findOne({username: username });
    if(admin_) {
        const validPassword = await bcrypt.compare(password, admin_.password);
        if(validPassword) {
            res.cookie("admin_tk", username, { signed: true });
            res.json('Đăng nhập thành công')
        }
        else {
            res.json({status: "Sai mật khẩu"})
        }
    } 
    else {
        res.json({status: "Tài khoản không tồn tại"})
    }
}

const Logout = (req, res) => {
    res.clearCookie("admin_tk");
    res.json("Đăng xuất")
    res.end()
}

module.exports = {
    View: loginView,
    Login: Login,
    Logout: Logout
}