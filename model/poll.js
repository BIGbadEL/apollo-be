const mongoose = require('mongoose');
const questionSchema = require('question');
const settingsSchema = require('settings');
const coreSchema = require('core');

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