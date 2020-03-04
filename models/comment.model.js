const mongoose = require('mongoose');
const ProfileSchema = require('./profile.model.js');

const CommentSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,

    userName: {
        type: String,
        ref: ProfileSchema
    },
    commentDate:{
        type:Date,
        required: true,
        default: Date.now()
    },
    content: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        enum: [1,2,3,4,5],
        required: true,
        default: 3
    },
    state: {
        type: String,
        enum:['delete','unapproved','approved'],
        required: true,
        default:'unapproved'
    }
});

module.exports = mongoose.model('Comment', CommentSchema);
