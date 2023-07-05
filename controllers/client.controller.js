const mongoose = require('mongoose')
const newsModel = require('../models/News')
const MostNews = require('../models/MostNews')
const clientModel = require('../models/Client')

const homeView = (req, res) => {
    res.sendFile('public/views/index.html', { root: '.' })
}

const allNewsView = (req, res, next) => {
    res.sendFile('public/views/tintuc.html', { root: '.' })
}

const tuyensinhduhocchuyenvisa = (req, res) => {
    res.sendFile('public/views/tuyen-sinh-du-hoc-chuyen-visa.html', { root: '.' })
}

const tuyensinhduhocdieuduong = (req, res) => {
    res.sendFile('public/views/tuyen-sinh-du-hoc-dieu-duong.html', { root: '.' })
} 

const tuyensinhduhockysu = (req, res) => {
    res.sendFile('public/views/tuyen-sinh-du-hoc-ky-su.html', { root: '.' })
} 

const tuyensinhduhocphatbao = (req, res) => {
    res.sendFile('public/views/tuyen-sinh-du-hoc-phat-bao.html', { root: '.' })
} 

const thongbaotuyensinhduhocnhatban = (req, res) => {
    res.sendFile('public/views/thong-bao-tuyen-sinh-du-hoc-nhat-ban.html', { root: '.' })
} 

const hosoduhoc = (req, res) => {
    res.sendFile('public/views/ho-so-du-hoc.html', { root: '.' })
}

const chuongtrinhdaotaotiengnhat = (req, res) => {
    res.sendFile('public/views/chuong-trinh-dao-tao-tieng-nhat.html', { root: '.' })
}

const chuongtrinhdaotaotienghan = (req, res) => {
    res.sendFile('public/views/chuong-trinh-dao-tao-tieng-han.html', { root: '.' })
}

const tuvungtiengnhat = (req, res) => {
    res.sendFile('public/views/tu-vung-tieng-nhat.html', { root: '.' })
} 


const bangchucaitiengnhat = (req, res) => {
    res.sendFile('public/views/bang-chu-cai-tieng-nhat.html', { root: '.' })
} 

const vechungtoi = (req, res) => {
    res.sendFile('public/views/ve-chung-toi.html', { root: '.' })
}

const getNewsByID = (req, res) => {
    res.cookie('news_id', req.params.id)
    res.sendFile('public/views/trangtintuc.html', { root: '.' })
}

const huongdannhapcanhnhatban = (req, res) => {
    res.cookie('news_id', req.params.id)
    res.sendFile('public/views/huong-dan-nhap-canh-nhat-ban.html', { root: '.' })
}

const huongdannhapcanhhanquoc = (req, res) => {
    res.cookie('news_id', req.params.id)
    res.sendFile('public/views/huong-dan-nhap-canh-han-quoc.html', { root: '.' })
}

const thongbaotuyensinhduhochanquoc = (req, res) => {
    res.sendFile('public/views/thong-bao-tuyen-sinh-du-hoc-han-quoc.html', { root: '.' })
}

const xuatkhaulaodongnhatban = (req, res) => {
    res.sendFile('public/views/xuat-khau-lao-dong-nhat-ban.html', { root: '.' })
}

const xuatkhaulaodongnhatbantokutei = (req, res) => {
    res.sendFile('public/views/xuat-khau-lao-dong-tokutei-nhat-ban.html', { root: '.' })
}


const tuyendungkysu = (req, res) => {
    res.sendFile('public/views/tuyen-dung-ky-su.html', { root: '.' })
}

const xuatkhaulaodonghanquoc = (req, res) => {
    res.sendFile('public/views/xuat-khau-lao-dong-han-quoc.html', { root: '.' })
}

const getAPINewsByID = async (req, res) => {
    const news_id = req.body.news_id
    if(!mongoose.isValidObjectId(news_id)) {
        return res.json('404')
    }
    const news_doc = await newsModel.findOne({ _id: mongoose.Types.ObjectId(news_id) })

    if(!news_doc) {
        return res.json('404')
    }
    let dict_news = {}
    dict_news['_id'] = news_doc._id
    dict_news['title'] = news_doc.title
    let created_date_arr = news_doc.created_date.toISOString().substr(0, 10).split("-")
    let true_date = created_date_arr[2] + '/' + created_date_arr[1] + '/' + created_date_arr[0]

    dict_news['created_date'] = true_date

    dict_news['elements'] = news_doc.elements

    const list_random_news = await newsModel.aggregate([
        { $match: { "_id": { "$ne": mongoose.Types.ObjectId(news_id) } } },
        { $sample: { size: 3 } }
    ]);
    let l_random_news = []
    let l_most_news = []

    for (let news of list_random_news) {
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
        l_random_news.push(dict_news)
    }


    const _most_news = await MostNews.find()

    for (let mnews_id of _most_news[0].list_id) {
        let news_element = await newsModel.find({ _id: mnews_id })
        let dict_news = {}
        dict_news['_id'] = news_element[0]._id
        dict_news['title'] = news_element[0].title
        for (let i of news_element[0].elements) {
            if (i.img) {
                dict_news['image_title'] = i['img']
                break;
            }
        }
        l_most_news.push(dict_news)
    }

    const data = {
        dict_news: dict_news,
        l_random_news: l_random_news,
        l_most_news: l_most_news
    }

    res.json(data)
}


const registerContact = (req, res) => {
    const fullname = req.body.fullname
    const email = req.body.email
    const contact = req.body.contact
    const birth = req.body.birth
    const city = req.body.city
    const active = req.body.active
    const national = req.body.national
    const more = req.body.more

    const newClient = new clientModel({
        fullname: fullname,
        email: email,
        contact: contact,
        birth: birth,
        city: city,
        active: active,
        national: national,
        more: more
    })
    newClient.save().then(() => res.json("Đăng ký thành công")).catch((err) => {
        console.log(err)
        res.json("Đăng ký thất bại")
    })
}

module.exports = {
    homeView: homeView,
    allNewsView: allNewsView,
    getNewsByID: getNewsByID,
    getAPINewsByID: getAPINewsByID,
    registerContact: registerContact,
    tuyensinhduhocchuyenvisa: tuyensinhduhocchuyenvisa,
    tuyensinhduhocdieuduong: tuyensinhduhocdieuduong,
    tuyensinhduhockysu: tuyensinhduhockysu,
    tuyensinhduhocphatbao: tuyensinhduhocphatbao,
    thongbaotuyensinhduhocnhatban: thongbaotuyensinhduhocnhatban,
    hosoduhoc: hosoduhoc,
    chuongtrinhdaotaotiengnhat: chuongtrinhdaotaotiengnhat,
    chuongtrinhdaotaotienghan: chuongtrinhdaotaotienghan,
    tuvungtiengnhat: tuvungtiengnhat,
    bangchucaitiengnhat: bangchucaitiengnhat,
    vechungtoi: vechungtoi,
    huongdannhapcanhnhatban: huongdannhapcanhnhatban,
    huongdannhapcanhhanquoc: huongdannhapcanhhanquoc,
    thongbaotuyensinhduhochanquoc: thongbaotuyensinhduhochanquoc,
    xuatkhaulaodongnhatban: xuatkhaulaodongnhatban,
    xuatkhaulaodongnhatbantokutei, xuatkhaulaodongnhatbantokutei,
    tuyendungkysu: tuyendungkysu,
    xuatkhaulaodonghanquoc: xuatkhaulaodonghanquoc
}
