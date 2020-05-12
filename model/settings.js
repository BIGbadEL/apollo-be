const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
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

exports.settingsSchema = settingsSchema;