const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    avatar: {
        type: String, 

    },
    friendships: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship',
        }
    ]
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function(req, file, cb){ // cb is a callback function that will be called when the upload is finished
        cb(null, path.join(__dirname, '..', AVATAR_PATH))   // __dirname refers to the current directory of the script, and '..' refers to the parent directory)
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+ '-' + Date.now())
    }
});

// static methods
    userSchema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
    userSchema.statics.avatarPath = AVATAR_PATH;



const User = mongoose.model('User',userSchema);

module.exports = User;