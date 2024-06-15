module.exports.profile = function(req,res){
   return res.render('users_profile',{
    title : "Profile"
   })
}

module.exports.privacy = function(req,res){
    res.end('<h1>User Privacy</h1>');
}

module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Codiel | Sign Up"
    })
}

module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Codiel | Sign In"
    })
}


