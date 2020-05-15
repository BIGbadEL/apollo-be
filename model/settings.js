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
    sendSumary: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
    },
    expire: {
        type: Date,
        required: true
    }
});

const Settings = new mongoose.model('Settings', settingsSchema);
exports.settingsSchema = settingsSchema;
exports.Settings = Settings;