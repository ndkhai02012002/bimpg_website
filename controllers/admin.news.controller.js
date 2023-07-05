'use strict'

const ImageModel = require('../models/Image')
const NewsModel = require('../models/News')
const MostNews = require('../models/MostNews')

const multer = require('multer')
const mongoose = require('mongoose')

const addNewsView = (req, res) => {
    res.sendFile('public/views/adminaddnews.html', { root: '.' })
}

const allNewsView = (req, res) => {
    res.sendFile('public/views/adminallnews.html', { root: '.' })
}

const storage = multer.diskStorage({
    destination: 'public/images',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
}).single('news_img')

const insertImage = async (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            const newImage = new ImageModel({
                name: req.file.originalname,
                image: {
                    data: req.file.filename,
                    contentType: req.file.mimetype
                },
            })
            newImage.save().then(() => res.json("Thêm ảnh thành công")).catch((err) => {
                console.log(err)
                res.json("Thêm ảnh thất bại")
            })
        }
    })
}

const createNews = async (req, res) => {
    const element_news = req.body

    const title_news = element_news[0].h1
    let date_now = Date(Date.now()).toString()

    const newNews = new NewsModel({
        title: title_news,
        elements: element_news,
        created_date: date_now
    })
    newNews.save(function (err) {
        if (err) {
            console.error(err);
            res.json("Thêm tin tức thất bại")
        }
        else {
            res.json("Thêm tin tức thành công")
        }
    });
}

const getAllNews = async (req, res) => {
    const _all_news = await NewsModel.find()
    let list_all_news = []
    for (let news of _all_news) {
        let dict_news = {}
        dict_news['_id'] = news._id
        dict_news['title'] = news.title
        dict_news['created_date'] = news.created_date
        for (let i of news.elements) {
            if (i.img) {
                dict_news['image_title'] = i['img']
                break;
            }
        }
        list_all_news.push(dict_news)
    }

    res.json(list_all_news)
}

const getAllNewsForClient = async (req, res) => {
    const count_index_news = parseInt(req.body.count_index_news)
    const _all_news = await NewsModel.find().sort({ _id: -1 }).skip(count_index_news * 5).limit(5)
    let list_all_news = []
    let list_most_news = []

    for (let news of _all_news) {
        let dict_news = {}
        dict_news['_id'] = news._id
        dict_news['title'] = news.title
        let created_date_arr = news.created_date.toISOString().substr(0, 10).split("-")
        let true_date = created_date_arr[2] + '/' + created_date_arr[1] + '/' + created_date_arr[0]

        dict_news['created_date'] = true_date

        for (let i of news.elements) {
            if (i.img) {
                dict_news['image_title'] = i['img']
                break;
            }
        }
        for (let i of news.elements) {
            if (i.p) {
                dict_news['some_text'] = i['p'].split(" ").slice(0, 20).join(" ")
                break;
            }
        }
        list_all_news.push(dict_news)
    }

    const _most_news = await MostNews.find()

    if (_most_news !== []) {
        for (let mnews_id of _most_news[0].list_id) {
            let news_element = await NewsModel.find({ _id: mnews_id })
            let dict_news = {}
            dict_news['_id'] = news_element[0]._id
            dict_news['title'] = news_element[0].title
            for (let i of news_element[0].elements) {
                if (i.img) {
                    dict_news['image_title'] = i['img']
                    break;
                }
            }
            list_most_news.push(dict_news)
        }
    }


    if (req.cookies.count_index_news == 0) {
        const news_data = {
            list_all_news: list_all_news,
            list_most_news: list_most_news
        }
        res.json(news_data)
    }
    else {
        const news_data = {
            list_all_news: list_all_news,
        }
        res.json(news_data)
    }


}

const insertMostNews = async (req, res) => {
    const list_id = req.body.list_id
    const true_list_id = []
    const false_list_id = []
    for (let i = 0; i < list_id.length; i++) {
        if (mongoose.Types.ObjectId.isValid(list_id[i])) {
            var _news = await NewsModel.findOne({ _id: mongoose.Types.ObjectId(list_id[i]) })
            if (_news) {
                true_list_id.push(_news._id)
            }
            else {
                false_list_id.push(i + 1)
            }
        }
        else {

            false_list_id.push(i + 1)

        }
    }

    if (false_list_id.length == 0) {
        res.json("Thêm thành công")

        await MostNews.deleteOne().then(function (err) {
            if (err) return console.error(err)
        });

        let new_most_news = new MostNews({
            list_id: true_list_id
        })

        await new_most_news.save(function (err) {
            if (err) return console.error(err);
        });
    }
    else {
        res.json(false_list_id)
    }
}

const removeNews = (req, res) => {
    const news_id = mongoose.Types.ObjectId(req.body.news_id)

    NewsModel.findOneAndRemove({ _id: news_id }).then(
        function () {
            res.json('Xóa thành công')
        }).catch(function (err) {
            console.log(err)
        })
}

module.exports = {
    View: addNewsView,
    ViewAllNews: allNewsView,
    Create: createNews,
    InsertImage: insertImage,
    GetAllNews: getAllNews,
    insertMostNews: insertMostNews,
    getAllNewsForClient: getAllNewsForClient,
    removeNews: removeNews
}