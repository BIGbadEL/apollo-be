const express = require('express');
const { questionSchema, Question } = require('../model/question');
const { PollSchema, Poll } = require('../model/poll');
const { coreSchema, Core } = require('../model/core');
const { settingsSchema, Settings } = require('../model/settings');
const { answerSchema, Answer } = require('../model/answer');


const router = express.Router();

router.post('/', async (req, res) => {
    req.body.answer.forEach(async element => {
        const answer = new Answer({
            questionId: element.id, 
            value: element.value,
            signature: req.body.signature
        });
        await answer.save();
    });

    res.send("OK");
});

module.exports = router;
