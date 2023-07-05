const express = require('express');
const router = express.Router();

const registerController = require('../controllers/admin.register.controller')
const newsController = require('../controllers/admin.news.controller')
const loginController = require('../controllers/admin.login.controller');
const clientController = require('../controllers/client.controller');
const managerController = require('../controllers/admin.client.controller')

router.get('/admin/register', registerController.View)
router.post('/api/admin/logout', loginController.Logout)
router.post('/api/admin/register', registerController.Register)

router.get('/admin/add-news', newsController.View)
router.post('/api/admin/add-news', newsController.Create)
router.post('/api/admin/add-images', newsController.InsertImage)

router.get('/api/admin/get-all-news', newsController.GetAllNews)

router.get('/admin/all-news', newsController.ViewAllNews)
router.get('/admin/manager-client', managerController.clientView)
router.post('/api/admin/insert-most-news', newsController.insertMostNews)
router.post('/api/admin/remove-news', newsController.removeNews)
router.post('/api/admin/get-all-information-client', managerController.getAllClient)

module.exports = router ;
