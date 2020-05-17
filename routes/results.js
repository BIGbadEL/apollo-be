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
    const result = [];
    if(poll) {
        poll.questions.forEach(async element => {
            result.push({
                title: element.value,
                answers: element.options.map(element => {
                    return ({
                        value: element,
                        count: 0
                    });
                }),
                type: element.type
            });
            const answers = await Answer.find({ questionId: element._id });
            console.log(element._id)
            console.log(answers);
            answers.forEach(element => {
                console.log("xD");
                element.forEach(val => {
                    result[result.length - 1].answers.forEach(option => {
                        if (option.value == val){
                            option.count += 1;
                        }
                    })
                })
            });
        });
        //console.log(result);
        res.send(result);
    } else {
        res.send([]);
    }
});

module.exports = router;
