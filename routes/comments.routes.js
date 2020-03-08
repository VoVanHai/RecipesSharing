module.exports = (app) => {
    const comment = require('../controllers/comments.controller.js');

    // Create a new Note
    app.post('/comment/:recipeId', comment.create);
    

    // Retrieve all Notes
    app.get('/comment/:recipeId', comment.findAll);

    //approve a comment
    app.put("/comment/:commentId",comment.approved);

    //delete a comment
    app.delete("/comment/:commentId",comment.delete);

}