const User = require('../models/user');

module.exports.profile = async function(req,res){
    try{
        let user = await User.findById(req.params.id)
        return res.render('users_profile',{
            title : "Profile",
            profile_user: user
           })

    }catch(err){
        console.log("Error Location User Profile")
        return res.redirect('back')
    }   
}

module.exports.privacy = function(req,res){
    res.end('<h1>User Privacy</h1>');
}

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findByIdAndUpdate(req.params.id, req.body);
            if (user){
               return res.redirect('back') 
            }else{
                console.log("User Not Matched")
                return res.redirect('back')
            }
        }catch(err){
            return res.status(401).send('Unauthorized');
        }  
    }
}

// render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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
module.exports.createSession = function(req,res){
    return res.redirect('/users/profile');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) {
            console.log('Error:', err);
            return res.redirect('back');
        }
        return res.redirect('/');
    });
}


