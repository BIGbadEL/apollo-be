const mongoose = require('mongoose');

const coreSchema = new mongoose.Schema({
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
    }
});

exports.coreSchema = coreSchema;