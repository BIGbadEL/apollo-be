const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    questionId: {
        type: String,
    }, 
    value: {
        type: [String],
    },
    signature: {
        type: String
    }
});

const Answer = new mongoose.model('Answer', answerSchema);
exports.answerSchema = answerSchema;
exports.Answer = Answer;