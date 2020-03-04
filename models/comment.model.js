const mongoose = require('mongoose');
const RecipeSchema = require('../models/recipe.model.js');
const ProfileSchema = require('./profile.model.js');
const CommentSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    recipeId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: RecipeSchema
    },
    userName: {
        type: mongoose.Schema.Types.ObjectId,
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
