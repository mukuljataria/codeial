const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy')
const passportJWT = require('./config/passport-jwt-strategy')
const passportGoogle = require('./config/passport-google-oauth2-strategy')
//Used for Session Cookie
const MongoStore = require('connect-mongo');
const session = require('express-session');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware')

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app)
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000')
console.log(process.env.CODEIAL_ASSET_PATH)

const path = require('path');

//middlewares
if (env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path,'scss'),
        dest: path.join(__dirname, env.asset_path,'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(env.asset_path))
// make the upload part available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

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
    secret: env.session_cookie_key,
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
app.use(flash());
app.use(customMware.setFlash); 
//use express router
app.use('/', require('./routes'))

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
}); 