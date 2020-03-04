const mongoose = require('mongoose');
const ProfileSchema = require('./profile.model.js');
const CommentSchema = require('../models/comment.model');

const IngredientSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    ingredientName: {
        type: String,
        required: true
    },
    original: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
});
const RecipeSchema = new mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    recipeName: {
        type: String,
        required: true
    },
    description: String,
    ingredients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: IngredientSchema
        }
    ],
    images: [],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: CommentSchema
        }
    ],
    method:String,
    cookingTime:{
        type:Number,
        required:true
    },
    nutrition:String,
    hardLevel:{
        type: String,
        required: true,
        enum:['very-easy', 'easy', 'hard', 'very-hard'],
        default: 'easy'
    },
    crateBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: ProfileSchema
    },
    state:{
        type: String,
        required:true,
        enum: ['deleted','inactive','processing','active'],
        default: 'inactive'
    }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
