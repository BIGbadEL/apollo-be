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
    //console.log(poll);
    const result = poll ? await Promise.all(poll.questions.map(async element => {
        const answers = await Answer.find({ questionId: element._id });
        console.log(element.value , answers);
        //console.log(element.options);
        return {
            title: element.value,
            type: element.type,
            answers: element.type === 'text' ? answers.map(ans => ans.value).flat() : element.options.map(answer => ({
                value: answer,
                count: answers.reduce((acc, val) => acc + val.value.includes(answer), 0)
            }))
        }
    })) : [];
    //console.log(result);
    //console.log(poll);
    res.send(result);
});

module.exports = router;
