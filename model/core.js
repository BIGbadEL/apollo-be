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

const Core = new mongoose.model('Core', coreSchema);
exports.coreSchema = coreSchema;
exports.Core = Core;