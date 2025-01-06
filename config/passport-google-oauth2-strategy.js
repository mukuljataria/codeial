const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// * tell passport to use a new strategy for google login
passport.use(new googleStrategy({

    },
    async function(accessToken, refreshToken, profile, done){
        try{
            //* find  a user
            let user = await User.findOne({email: profile.emails[0].value})
            console.log(accessToken);
            console.log("\n-----------\n")
            console.log(refreshToken);

            console.log(profile);
            if(user){
                //* if found set this user as req.user
                return done(null, user);
            }else{
                try{
                    //* if not found create a new user and set it as req.user
                    let user =  await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    })
                    return done(null, user);
                }catch(err){
                    console.log("Error in creating user google strategy-passport", err); 
                    return;
                }
            }
        }catch(err){
            console.log("Error in google strategy-passport", err); 
            return;
        }
    }
));

module.exports = passport;