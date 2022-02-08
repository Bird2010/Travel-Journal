const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// define the mongoose schema with one field - username
// username is a string, required and must be unique based on the attributes below
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
}, {
    timestamps:true,
});

const User = mongoose.model('User', userSchema);  // Mongoose model is capital and singular
module.exports = User;    // export the mongoose model
