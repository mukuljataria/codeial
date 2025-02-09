const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const env = require('./environment')

const User = require('../models/user')

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwt_secret
}

passport.use(new JWTStrategy(opts, async function (jwtPayload, done) {
    try {
        // console.log("\n----payload_id----\n",jwtPayload._id)
        let user = await User.findById(jwtPayload._id); // No callback, returns a Promise
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        console.error('Error in finding user from JWT', err);
        return done(err, false);
    }
}));


module.exports = passport;