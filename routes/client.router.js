const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller')
const loginController = require('../controllers/admin.login.controller')
const newsController = require('../controllers/admin.news.controller')

router.get('/', clientController.homeView)
router.get('/tin-tuc-du-hoc-va-xuat-khau-lao-dong', clientController.allNewsView)
router.get('/tin-tuc-du-hoc-va-xuat-khau-lao-dong/:id', clientController.getNewsByID)
router.get('/tuyen-sinh-du-hoc-chuyen-visa' , clientController.tuyensinhduhocchuyenvisa)
router.get('/tuyen-sinh-du-hoc-dieu-duong' , clientController.tuyensinhduhocdieuduong)
router.get('/tuyen-sinh-du-hoc-ky-su', clientController.tuyensinhduhockysu)
router.get('/tuyen-sinh-du-hoc-phat-bao', clientController.tuyensinhduhocphatbao)
router.get('/thong-bao-tuyen-sinh-du-hoc-nhat-ban', clientController.thongbaotuyensinhduhocnhatban)
router.get('/thong-bao-tuyen-sinh-du-hoc-han-quoc', clientController.thongbaotuyensinhduhochanquoc)
router.get('/xuat-khau-lao-dong-nhat-ban', clientController.xuatkhaulaodongnhatban)
router.get('/tuyen-dung-ky-su-han-quoc', clientController.xuatkhaulaodonghanquoc)
router.get('/tuyen-dung-ky-su-nhat-ban', clientController.tuyendungkysu)
router.get('/xuat-khau-lao-dong-nhat-ban-tokutei', clientController.xuatkhaulaodongnhatbantokutei)
router.get('/ho-so-du-hoc', clientController.hosoduhoc)
router.get('/chuong-trinh-dao-tao-tieng-nhat', clientController.chuongtrinhdaotaotiengnhat)
router.get('/chuong-trinh-dao-tao-tieng-han', clientController.chuongtrinhdaotaotienghan)
router.get('/1000-tu-vung-tieng-nhat', clientController.tuvungtiengnhat)
router.get('/huong-dan-nhap-canh-nhat-ban', clientController.huongdannhapcanhnhatban)
router.get('/huong-dan-nhap-canh-han-quoc', clientController.huongdannhapcanhhanquoc)
router.get('/bang-chu-cai-tieng-nhat', clientController.bangchucaitiengnhat)
router.get('/gioi-thieu-cong-ty-bimpg', clientController.vechungtoi)
router.get('/admin/login', loginController.View)
router.post('/api/admin/login-WxTPlLXkXsNBQ1vW', loginController.Login)
router.post('/api/get-news-by-id-WxTPlLXkXsNBQ1vW', clientController.getAPINewsByID)
router.post('/api/get-all-news-WxTPlLXkXsNBQ1vW', newsController.getAllNewsForClient)
router.post('/api/register-contact-form-WxTPlLXkXsNBQ1vW', clientController.registerContact)
module.exports = router ;