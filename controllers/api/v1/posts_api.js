const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req,res){

    let posts =  await Post.find({}).sort('-createdAt').populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user'
        } 
    })

    return res.json(200, {
        message: 'List of posts',
        posts: posts
    })
}

module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);
        //* .id means converting the object id into string
        if (post.user == req.user.id) {
            // try {
                await post.deleteOne(); // Use deleteOne() instead of remove()
                await Comment.deleteMany({ post: req.params.id });
                return res.json(200,{
                    message: 'Post and associated comments deleted!'
                })


                // if(req.xhr){
                //     return res.status(200).json({
                //         data: {
                //             post_id: req.params.id
                //         },
                //         message: "Post Deleted!"
                //     })
                // }



                // req.flash('success', 'Post and associated comments deleted!');
                // return res.redirect('back');
            // } catch (err) {
            //     // req.flash('error',err)
            //     // console.log("Error in deleting the comments:", err);
            //     return res.redirect('back');
            // }
        } else {
            return res.json(401,{
                message: 'You are Unauthorized to delete this post',
            })
        }
    } catch (err) {
        // req.flash('error',err) 
        // console.log("Error in deleting a post:", err);
        // return res.redirect('back');
        console.log("Error in deleting a post",err);
        return res.json(500, {
            message: 'Internal Server Error',
            error: err
        })
    }
};
