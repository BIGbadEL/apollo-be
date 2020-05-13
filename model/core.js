const mongoose = require('mongoose');

const coreSchema = new mongoose.Schema({
    pinUser: {
        type: Number,
    }, 
    pinCreator: {
        type: Number,
    },
    url: {
        type: String,
        required: true
    }
});



const Core = new mongoose.model('Core', coreSchema);
exports.coreSchema = coreSchema;
exports.Core = Core;