const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy')
//Used for Session Cookie
const MongoStore = require('connect-mongo');
const session = require('express-session');
const sassMiddleware = require('node-sass-middleware');

//middlewares
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'))

app.use(expressLayouts);
// extract style an script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views')


//* mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO Change the secret before deployment in production mode.
    secret: 'blahsomething',
    saveUninitialized: false, // flag to check if i want to store extra data, when user is not logged in.
    resave: false, // prevent form saving cookie data again and again.
    cookie: {
        maxAge: (1000 * 60 * 100) //in ms
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codiel-development'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
 
//use express router
app.use('/', require('./routes'))

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
}); 