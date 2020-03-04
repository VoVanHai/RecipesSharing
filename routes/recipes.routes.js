module.exports = (app) => {
    const recipe = require('../controllers/recipes.controller.js');

    // Create a new Note
    app.post('/recipe', recipe.create);

    // Retrieve all Notes
    app.get('/recipes', recipe.findAll);

//     // Retrieve a single Note with noteId
//     app.get('/notes/:noteId', notes.findOne);
//
//     // Update a Note with noteId
//     app.put('/notes/:noteId', notes.update);
//
//     // Delete a Note with noteId
//     app.delete('/notes/:noteId', notes.delete);
}