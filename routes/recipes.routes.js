module.exports = (app) => {
    const recipe = require('../controllers/recipes.controller.js');

    // Create a new Recipe
    app.post('/recipe', recipe.create);

    // Retrieve all Recipes
    app.get('/recipes', recipe.findAll);

    // Retrieve a single Recipe with RecipeId
    app.get('/recipe/:id', recipe.findOne);



//
//     // Update a Recipe with RecipeId
//     app.put('/Recipes/:RecipeId', Recipes.update);
//
//     // Delete a Recipe with RecipeId
//     app.delete('/Recipes/:RecipeId', Recipes.delete);

    
}