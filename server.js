const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const adminRouter = require('./routes/admin.router')
const clientRouter = require('./routes/client.router')
require('dotenv').config()
var cookieParser = require('cookie-parser')
app.use(cookieParser(process.env.cookieParserKey))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


const mongoose = require("mongoose");

const db = mongoose.connection;
const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, { dbName: 'bimpg_db' }).then(() => console.log('DB Connected!'));
    db.on('error', (err) => {
        console.log('DB connection error:', err.message);
    })
}
connectDB()
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Credentials', true);
        return res.status(200).json({});
    }
    next();
});

app.use(express.static('public'))

app.use('/', clientRouter);

app.use((req, res, next) => {
    if (req.signedCookies['admin_tk']) {
        next()
    }
    else {
        res.sendFile('public/views/404page.html', { root: '.' })
    }

})

app.use('/', adminRouter);

app.use((req, res, next) => {
    res.sendFile('public/views/404page.html', { root: '.' })
})

const port = process.env.PORT
app.listen(port, () => { console.log("Server started on http://localhost:" + port) })