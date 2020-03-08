const Comment = require('../models/comment.model.js');
const Recipe = require('../models/recipe.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.userName) {
        return res.status(400).send({
            message: "recipe content can not be empty"
        });
    }
    const comment =new Comment({
        userName: req.body.userName,
        commentDate:Date.now(),
        content: req.body.content,
        rate:req.body.rate || "3",
        state:"unapproved"
    });
    //comment.save()
    addComment2Recipe(req.params.recipeId,comment)
    .then(docComment=>{
        console.log("add comment to recipe");
        
        res.send(docComment);
    })
    .catch(err=>{
        console.log("Error save comment: ",err.message);
    });
}

const addComment2Recipe = function(recipeId, comment){
    return comment.save(comment)
    .then(docComment=>{
        return Recipe.findByIdAndUpdate(
            recipeId,
            {
                $push:{comments: docComment._id}
            },
            { new: true, useFindAndModify: false }
        ); 
    });  
}
//
// Retrieve and return all comments of one recipe.
exports.findAll = (req, res) => {
    var recipeId = req.params.recipeId;
    Recipe.find({"_id":recipeId})
    .populate("comments") //get whole recipe with full-comments
    .select({"comments":1, "_id":0}) //projecct - receive only comment field
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving comment."
        });
    });
};

//processing comment, setit's state to 'approved'
exports.approved = (req,res) => {
    //var state = req.params.state;
    Comment.findByIdAndUpdate(req.params.commentId,
        {
            state : "approved"
        })
    .then(docComment => {
        res.send(docComment);
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while approving comment."
        });
    });
}

//processing comment, setit's state to 'approved'
exports.delete = (req,res) => {
    //var state = req.params.state;
    Comment.findByIdAndUpdate(req.params.commentId,
        {
            state : "deleted"
        })
    .then(docComment => {
        res.send(docComment);
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "Some error occurred while delete comment."
        });
    });
}