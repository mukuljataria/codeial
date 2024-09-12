const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post)
        if(post){
            try{
                let comment = await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                })
                if(comment){
                    post.comments.push(comment)
                    post.save();  
                    res.redirect('/'); 
                }

            }catch(err){
                //* handle Error
                console.log("")
            }
        }

    }catch(err){
        console.log("")
    }
}