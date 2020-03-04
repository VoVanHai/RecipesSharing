const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    userName: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: false
    },
    socialNetworkName: {
        type: String,
        required: false
    },
    socialNetworkUserId: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: true,
        enum: ['restrict', 'inactive', 'active','deleted'],
        default: 'inactive'
    },
    passwordResetToken: {
        type: String,
        required: false,
        default:""
    },
    notes: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);

