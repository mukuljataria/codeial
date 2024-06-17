const User = require('../models/user');

module.exports.profile = function(req,res){
   return res.render('users_profile',{
    title : "Profile"
   })
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
// module.exports.create = function(req,res){
//     if(req.body.password != req.body.confirm_password){
//         console.log("DIFF PASS's")
//         return res.redirect('back');
//     }
//     User.findOne({email: req.body.email}, function(err,user){
//         if(err){
//             console.log('Error in finding user in signing up');
//             return
//         }
//         if (!user){
//             console.log("New user")
//             User.create(req.body, function(err, user){
//                 if(err){
//                     console.log('Error in creating user while signing up');
//                     return
//                 }
//                 return res.redirect('/users/sign-in');
//             });
//         } else{
//             return res.redirect('back');
//         }
//     })
// }

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
    // to do later
}


