const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
   user: { //* Like Belong to the User
     type: mongoose.Schema.ObjectId 
   },
   //* This Defines the Object Id of the liked Object
   likeable: { //* Object on which Like Is Placed
    type: mongoose.Schema.ObjectId,
    required: true,
    refPath: 'onModel' //* It's a Dynamic Referrence(Path to Some other Field)
   },
   //* This Field is used for defining the type of the Liked Object, Since this is a Dynamic referrence
   onModel: {
    type: String,
    required: true,
    enum: ['Post', 'Comment'] //* Like can Refference to either Post or Comment
   },  
},{
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;