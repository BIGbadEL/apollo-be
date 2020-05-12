const mongoose = require('mongoose');
const questionSchema = require('question');

const pollSchema = new mongoose.Schema({
    pinUser: {
        type: Number,
        required: true
    }, 
    pinCreator: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema],
        required: true
    },
    requireSignature: {
        type: Boolean,
        required: true
    },
    resultsAccess: {
        type: String,
        required: true
    },
    expire: {
        type: Date,
        required: true
    }
});