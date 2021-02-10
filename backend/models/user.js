var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User model.
var User = new Schema({
    Name: {
        type: String,
        lowercase: true,
        trim: true,
        min: [4, 'firstName must be atleast 4 character long '],
        required: [true, "FirstName is required"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "email is required"]
    },

    password: {
        type: String,
        trim: true,
        min: [5, 'password must be atleast 5 character long '],
        required: [true, "password is required"]
    },
    photoURL: String,
    resetToken: String,
    myVideos: [
        {
            type: Schema.Types.ObjectId,
            ref: "video",
        }
    ],
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, { timestamps: true });

var User = mongoose.model('user', User);

module.exports = User;