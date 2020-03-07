 const Recipe = require('../models/recipe.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.recipeName) {
        return res.status(400).send({
            message: "Recipe content can not be empty"
        });
    }

    // Create a Note
    const recipe = new Recipe({
        recipeId: req.body.recipeId,
        description: req.body.description,
        ingredients: req.body.ingredients,
        images: req.body.images || "",
        comments: req.body.comments || "",
        method: req.body.method,
        cookingTime: req.body.cookingTime,
        nutrition: req.body.nutrition,
        hardLevel: req.body.hardLevel,
        crateBy: req.body.crateBy,
        state: req.body.state
    });

    // Save Recipe in the database
    recipe.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Recipe."
        });
    });
};

// Retrieve and return all recipes from the database.
exports.findAll = (req, res) => {
    Recipe.find({"state":"active"})
    .then(prf => {
        res.send(prf);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Recipes."
        });
    });
};

// // Find a single note with a noteId
// exports.findOne = (req, res) => {
//     Note.findById(req.params.noteId)
//     .then(note => {
//         if(!note) {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });
//         }
//         res.send(note);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });
//         }
//         return res.status(500).send({
//             message: "Error retrieving note with id " + req.params.noteId
//         });
//     });
// };
//
// // Update a note identified by the noteId in the request
// exports.update = (req, res) => {
//     // Validate Request
//     if(!req.body.content) {
//         return res.status(400).send({
//             message: "Note content can not be empty"
//         });
//     }
//
//     // Find note and update it with the request body
//     Note.findByIdAndUpdate(req.params.noteId, {
//         title: req.body.title || "Untitled Note",
//         content: req.body.content
//     }, {new: true})
//     .then(note => {
//         if(!note) {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });
//         }
//         res.send(note);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });
//         }
//         return res.status(500).send({
//             message: "Error updating note with id " + req.params.noteId
//         });
//     });
// };
//
// // Delete a note with the specified noteId in the request
// exports.delete = (req, res) => {
//     Note.findByIdAndRemove(req.params.noteId)
//     .then(note => {
//         if(!note) {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });
//         }
//         res.send({message: "Note deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });
//         }
//         return res.status(500).send({
//             message: "Could not delete note with id " + req.params.noteId
//         });
//     });
// };
