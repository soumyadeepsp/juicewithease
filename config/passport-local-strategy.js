const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new localStrategy({
    usernameField: 'email'
}, (email, password, done) => {
    User.findOne({email: email}, (err, user) => {
        if (err) {
            console.log('Error in finding user for signing in passport');
            return done(err);
        }
        if (!user || user.password!=password) {
            console.log('Invalid username/password');
            return done(null, false);
        }
        return done(null, user);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if (err) {
            console.log('Error in finding user in deserializing user');
            return done(err);
        }
        return done(null, user);
    });
});

passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/user/signin');
};

passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;