const User = require('../models/user');

module.exports.profile = async function(req,res){

    if(req.cookies.user_id){
        let user = await User.findById(req.cookies.user_id)
        if(user){
            return res.render('users_profile',{
                title : "User Profile",
                user: user
               })
        }
        return res.redirect('/users/sign-in');

    }else{
        return res.redirect('/users/sign-in');
    }

}

module.exports.privacy = function(req,res){
    res.end('<h1>User Privacy</h1>');
}

// render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    })
}


// get the sign up data
module.exports.create = async function(req, res) {
    try {
        if (req.body.password !== req.body.confirm_password) {
            console.log("DIFF PASS's");
            return res.redirect('back');
        }

        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.log("New user");
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error:', err);
        return res.redirect('back');
    }
};

// Sign in and create a session for the user
module.exports.createSession = async function(req,res){
   
    // steps to authenticate
    // find the user
    try {
    let user = await User.findOne({email: req.body.email});
    console.log(user);
    //handle user found
    if(user){
        //handle password which doesn't match
        if(user.password != req.body.password){
            console.log("password doesn't matched");
            return req.redirect('back');
        }
        console.log("password matched");
        //handle session creation
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
        
    }else{
         //handle user not found
         return res.redirect('back');
    }

    } catch (err) {
        console.log('Error:', err);
        return res.redirect('back');
    }



}


