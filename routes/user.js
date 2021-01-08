const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/userController');

router.get('/profile', passport.checkAuthentication, userController.profile);
router.get('/signup', userController.signUp);
router.get('/signin', userController.signIn);
router.get('/forgotPassword', userController.forgotPassword);
router.post('/create', userController.create);
router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: 'user/signin'}
),userController.createSession);
router.get('/signout', userController.destroySession);

module.exports = router;