const express = require('express');
const passport = require('passport');

const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/', passport.checkAuthentication, homeController.home);
router.use('/user', require('./user'));

module.exports = router;