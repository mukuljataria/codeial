const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');

module.exports.create = async function(req,res){
    try{
        console.log("Inside Controller");
        let post = await Post.findById(req.body.post)
        if(post){
            try{
                let comment = await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                })
                // if(comment){
                    post.comments.push(comment)
                    post.save();  

                    comment = await comment.populate('user', 'name email');
                    // commentsMailer.newComment(comment);
                    let job = queue.create('emails', comment).save(function(err){
                        if (err){
                            console.log(err)
                            return;
                        } 
                        console.log("\n---JOB_Enqueued---\n",job.id)
                    })
                    console.log("hello")
                    if (req.xhr){
                        // Similar for comments to fetch the user's id!
                        // comment = await comment.populate('user', 'name').execPopulate();

            
                        return res.status(200).json({
                            data: {
                                comment: comment
                            },
                            message: "Post created!"
                        });
                    }
        
        
                    req.flash('success', 'Comment published!');
                // }
                
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

               //* destroy the associated likes for this comment
               await Like.deleteMany({ likeable: comment._id, onModel: 'Comment'});

                // send the comment id which was deleted back to the views
                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            comment_id: req.params.id
                        },
                        message: "Post deleted"
                    });
                }


                req.flash('success', 'Comment deleted!');
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


