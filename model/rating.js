const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    url: {
        type: String,
    }, 
    rating: {
        type: Number
    }
});

const Rating = new mongoose.model('Rating', ratingSchema);
exports.ratingSchema = ratingSchema;
exports.Rating = Rating;