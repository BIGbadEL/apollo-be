const mongoose = require('mongoose');
const { questionSchema, Question } = require('./question');
const { settingsSchema, Settings } = require('./settings');
const { Core, coreSchema } = require('./core');

const pollSchema = new mongoose.Schema({
    core: {
        type: coreSchema,
        required: true
    }, 
    questions: {
        type: [questionSchema],
        required: true
    },
    settings: {
        type: settingsSchema,
        required: true
    }
});

const Poll = new mongoose.model('Pool', pollSchema);
exports.Poll = Poll;
exports.PollSchema = pollSchema;