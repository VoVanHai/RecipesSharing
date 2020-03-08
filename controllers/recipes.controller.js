 const Recipe = require('../models/recipe.model.js');
 const Comment = require('../models/comment.model.js');
// const mongoose = require('mongoose');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.recipeName) {
        return res.status(400).send({
            message: "recipe content can not be empty"
        });
    }

    // Create a Note
    const recipe = new Recipe({
        recipeName:req.body.recipeName,
        description:req.body.description,
        ingredients:req.body.ingredients,
        images:req.body.images,
        //comments:[],
        method:req.body.method,
        cookingTime:req.body.cookingTime,
        nutrition:req.body.nutrition,
        hardLevel:req.body.hardLevel,
        createBy:req.body.createBy,
        state:req.body.state
    });

    const lstIngredients = req.body.ingredients;
    const lstImages = req.body.images;

    var rec = recipe.save(recipe)
    .then(docRecipe => {
        //console.log("\n>> Created recipe:\n", docRecipe);
        lstIngredients.forEach(element => {               
            rec =  addIngredient(recipe._id, {
                ingredientName:element.ingredientName,
                original:element.original,
                description:element.description
            }) ;
        });

        lstImages.forEach(img=>{
            rec= addImage(recipe._id,{
                url:img.url,
                caption: img.caption,
            }); 
        });
        console.log("recipe save ",recipe);
        res.send(docRecipe);
    },aa=>{
        console.log('can not save with cause: ',aa.message);
        res.send(aa);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Recipe."
        });
    });

};



const addIngredient = function(recipeId, ingredient){
    return Recipe.findByIdAndUpdate(
        recipeId,
        {$push:{ingredients:
            {
                ingredientName:ingredient.ingredientName,
                original:ingredient.original,
                description:ingredient.description
            }
        }},
        { new: true, useFindAndModify: false }
    ); 
}
const addImage = function(recipeId, img){
    return Recipe.findByIdAndUpdate(
        recipeId,
        {$push:{images:
            {
                url:img.url,
                caption: img.caption
            }
    }},
        { new: true, useFindAndModify: false }
    ); 
}



// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Recipe.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a ingredientName
exports.findOne = (req, res) => {
    var id=req.params.id;
    Recipe.findOne({"_id":id})
    .then(ing => {
        if(!ing) {
            return res.status(404).send({
                message: "Recipe not found  " + req.params.id
            });
        }
        res.send(ing);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Recipe not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving recipe  " + req.params.id
        });
    });
};
