const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    username: {type: String, required: true },
    place: {type: String, required: true},
    description: {type: String, required: true},
    rating: {type: Number, required: true, min: 0, max: 5},
    latitude: {type: Number},
    longitude: {type: Number},
}, {
    timestamps: true,
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
