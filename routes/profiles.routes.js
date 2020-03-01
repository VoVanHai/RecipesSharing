module.exports = (app) => {
    const profile = require('../controllers/profiles.controller.js');

    // Create a new Profile
    app.post('/profile', profile.create);

    // Retrieve active Profiles
    app.get('/profiles', profile.findActiveProfile);

    // Retrieve all Profiles
    app.get('/profile', profile.findAll);

    // Retrieve a single Profile with ProfileId
    app.get('/profile/:username', profile.findOne);

    // Update a Profile with ProfileId
    app.put('/profile/:username', profile.update);

    // Delete a Profile with ProfileId
    app.delete('/profile/:username', profile.delete);
}