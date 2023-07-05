const clientModel = require('../models/Client')

const clientView = (req, res) => {
    res.sendFile('public/views/thong-tin-khach-hang.html', {root: '.'})
}

const getAllClient = async (req, res) => {
    const all_client = await clientModel.find()
    if (all_client) {
        res.json(all_client)
    }
    else {
        res.json('Fetch information client failue!')
    }
}


module.exports = {
    clientView: clientView,
    getAllClient: getAllClient
}