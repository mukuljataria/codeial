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
                res.redirect('/'); 
            }
        }

    }catch(err){
        console.log("")
    }
}


module.exports.destroy = async function(req,res){
    try {
        let comment = await Comment.findById(req.params.id)
        if (comment.user == req.user.id){
            let postId = comment.post;
            await comment.deleteOne(); // Use deleteOne() instead of remove()
            try{
               let post =  await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}})
               return res.redirect('back'); 
            }catch(err){
                console.log("Error in deleting comment_id from post")
                return res.redirect('back'); 
            }
        }else{
            return res.redirect('back'); 
        }
    }catch(err){
        console.log("Error in deleting Comment")
        return res.redirect('back'); 
    }
}


