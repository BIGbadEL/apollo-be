const express = require('express');
const { questionSchema, Question } = require('../model/question');
const { PollSchema, Poll } = require('../model/poll');
const { coreSchema, Core } = require('../model/core');
const { settingsSchema, Settings } = require('../model/settings');
const { answerSchema, Answer } = require('../model/answer');


const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.body);
    req.body.answer[0]

    res.send("OK");
});


router.get('/', async (req, res) => {
    res.send("");
});



module.exports = router;
