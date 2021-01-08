const express = require('express');
const port = 8000;
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const localStrategy = require('./config/passport-local-strategy');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(session({
    name: 'juicewithease',
    secret: 'MY_SECRET_KEY',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (100*60*1000)
    },
    store: new mongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if (err) {
        console.log('Error in running the server: ', err);
        return;
    }
    console.log('Server is running perfectly fine on port: ', port);
})