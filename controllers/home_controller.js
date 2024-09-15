const Post = require('../models/post');
const User = require('../models/user')

module.exports.home = async function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id', 89);

    try{
        // Populate the user for each post
        let posts =  await Post.find({}).populate('user').populate({
            path: 'comments',
            populate: {
                path: 'user'
            } 
        })
        let users = await User.find({})
        return res.render('home', {
        title: "Home",
        posts: posts,
        all_users: users
        });
    }catch{
        console.log("Unable to Access Posts");
        return res.render('home', {
            title: "Home",
        });
    }


}

module.exports.index = function(req,res){
    return res.end('<h1>Index page</h1>');
}