const Profile = require('../models/profile.models.js');

// Create and Save a new Profile
exports.create = (req, res) => {
    // Validate request,....
    if(!req.body.userName) {
        return res.status(400).send({
            message: "Profile content can not be empty"
        });
    }
    // Create a Profile
    const profile = new Profile({
        userName: req.body.userName,
        userPassword: req.body.userPassword,
        fullName: req.body.fullName,
        dob: req.body.dob,
        email: req.body.email,
        avatar: req.body.avatar  || "",
        socialNetworkName: req.body.socialNetworkName  || "",
        socialNetworkUserId: req.body.socialNetworkUserId  || "",
        state: req.body.state,
        passwordResetToken: req.body.passwordResetToken  || "",
        notes: req.body.notes || ""
    });

    // Save Note in the database
    profile.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Profile."
        });
    });
};
// Retrieve and return all notes from the database.
exports.findActiveProfile = (req, res) => {
    Profile.find({"state":"active"})
        .then(prf => {
            res.send(prf);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Profiles."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Profile.find()
        .then(prf => {
            res.send(prf);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Profiles."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Profile.findOne({"userName":req.params.username})
        .then(prf => {
            if(!prf) {
                return res.status(404).send({
                    message: "Profile not found with id " + req.params._id
                });
            }
            res.send(prf);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Profile not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Profile content can not be empty"
        });
    }

    // Find note and update it with the request body
    Profile.findByIdAndUpdate(req.params._id, {
        userName: req.body.userName,
        fullName: req.body.fullName,
        dob: req.body.dob,
        email: req.body.email,
        avatar: req.body.avatar  || "",
        socialNetworkName: req.body.socialNetworkName  || "",
        socialNetworkUserId: req.body.socialNetworkUserId  || "",
        state: req.body.state,
        passwordResetToken: req.body.passwordResetToken  || "",
        notes: req.body.notes || "",
    }, {new: true})
        .then(prf => {
            if(!prf) {
                return res.status(404).send({
                    message: "Profile not found with id " + req.params.noteId
                });
            }
            res.send(prf);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Profile not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    //Profile.findByIdAndRemove(req.params._id)
    Profile.findOneAndUpdate({"userName":req.params.username}, {
        state: "deleted",
    })
        .then(prf => {
            if (!prf) {
                return res.status(404).send({
                    message: "Profile not found with id " + req.params._id
                });
            }
            res.send({message: "Profile deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Profile not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Could not delete Profile with id " + req.params._id
        });
    });
};
