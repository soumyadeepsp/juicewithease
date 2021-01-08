const User = require('../models/user');

module.exports.profile = (req, res) => {
    return res.render('profile');
}

module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('signUp');
}

module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('signIn');
}

module.exports.forgotPassword = (req, res) => {
    return res.render('forgotPassword');
}

module.exports.create = (req, res) => {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            console.log('Error in finding user with given email: ', err);
            return res.redirect('back');
        }
        if (!user) {
            User.create(req.body, (err, user) => {
                if (err) {
                    console.log('Error in creating new user: ', err);
                    return res.redirect('back');
                }
                return res.redirect('/user/signin');
            });
        } else {
            return res.redirect('back');
        }
    })
}

module.exports.createSession = (req, res) => {
    return res.redirect('/');
}

module.exports.destroySession = (req, res) => {
    req.logout();
    return res.redirect('/user/signin');
}

module.exports.showProducts = (req, res) => {
    
}