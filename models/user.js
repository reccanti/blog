const mongoose = require('mongoose');

/**
 * describes the structure of the User object
 */
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
});

/**
 * Define the User model
 */
var User = mongoose.model('User', UserSchema);

module.exports = User;
