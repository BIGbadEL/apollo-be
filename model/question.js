const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        min: 4,
        max: 128
    },
    value: {
        type: String,
        required: true,
        min: 4, 
        max: 4096
    },
    options: {
        type: [String],
        min: 1,
        max: 10
    },
    type: {
        type: String,
        min: 1,
        max: 10
    }
});

exports.questionSchema = questionSchema;
