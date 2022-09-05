const express = require('express');
const router = express.Router();
const stsController = require('../controllers/sts');
const foundController = require('../controllers/found');
const lostController = require('../controllers/lost')
const commonController = require('../controllers/common')
const userController = require('../controllers/user')

router.get('/sts',stsController.getSts)

router.post('/found',foundController.add)
router.post('/lost',lostController.add)

router.get('/found',foundController.list)
router.get('/lost',lostController.list)

router.get('/found/detail',foundController.detail)
router.get('/lost/detail',lostController.detail)

router.post('/found/detail/user',foundController.user)
router.post('/lost/detail/user',lostController.user)

router.get('/found/filter',foundController.filter)
router.get('/lost/filter',lostController.filter)
// router.post('/lost/filter',lostController.test)

router.get('/common/info/campus',commonController.getCampus)
router.get('/common/info/types',commonController.getTypes)

router.post('/login',userController.login)
router.get('/userinfo',userController.getInfo)
router.post('/logout',userController.logout)
router.post('/userinfo/update',userController.updateInfo)

module.exports = router