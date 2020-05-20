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
    sendSummary: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
    },
    expire: {
        type: Date,
        required: true
    },
    expired: {
        type: Boolean,
        default: false
    }
});

const Settings = new mongoose.model('Settings', settingsSchema);
exports.settingsSchema = settingsSchema;
exports.Settings = Settings;