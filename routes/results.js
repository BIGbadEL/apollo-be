const express = require('express');
const { questionSchema, Question } = require('../model/question');
const { PollSchema, Poll } = require('../model/poll');
const { coreSchema, Core } = require('../model/core');
const { settingsSchema, Settings } = require('../model/settings');
const { answerSchema, Answer } = require('../model/answer');


const router = express.Router();

async function find_poll_by_url(url) {
    const result = await Poll.find();
    for(let i = 0; i < result.length; i++){
        if (result[i].core.url === url){
            return result[i];
        }
    }
    return false;
}

router.get('/:url', async (req, res) => {
    const poll = await find_poll_by_url(req.params.url);
    console.log(poll);
    const answers = [];
    if(poll) {
        poll.questions.forEach(async element => {
            answers.push(await Answer.findOne({ questionId: element._id }));
        });
        console.log(answers)
        res.send(JSON.stringify(answers));
    } else {
        res.send([]);
    }
});

module.exports = router;
