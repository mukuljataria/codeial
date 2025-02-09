const User = require('../../../models/user')
const jwt = require('jsonwebtoken')
const env = require('../../../config/environment')

//* Sign in and create a session for the user
module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password !=  req.body.password){
            return res.status(422).json({
                message: 'Invalid email or password',
            })
        }

        return res.json(200, {
            message: 'Signed in successfully, here is your token, please keep it safe',
            data: {
                token: jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn: '500000'})
            }
        });

    }catch(err){
        console.log("*************",err);
        return res.json(500, {
            message: 'Internal Server Error',
        })
    }
}