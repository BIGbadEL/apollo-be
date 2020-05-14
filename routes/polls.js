const express = require('express');
const { questionSchema, Question } = require('../model/question');
const { PollSchema, Poll } = require('../model/poll');
const { coreSchema, Core } = require('../model/core');
const { settingsSchema, Settings } = require('../model/settings');

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

router.put('/', async (req, res) => {
    console.log(req.body.url);
    let old_poll = await find_poll_by_url(req.body.url);
    if(!old_poll){
        res.send("Url not found");
    }
    const q = [];
    req.body.questions.forEach(element => {
        q.push(new Question ({
            id: element.id,
            value: element.value,
            options: element.options,
            type: element.type
        }));
    });
    old_poll.questions = q;
    old_poll.settings = new Settings({
        requireSignature: req.body.settings.requireSignature,
        resultsAccess: req.body.settings.resultsAccess,
        expire: req.body.settings.expire
    });
    await Poll.findByIdAndUpdate(old_poll._id, old_poll);
    res.send("OK");
});

router.get('/:url', async (req, res) => {
    res.send(await find_poll_by_url(req.params.url));
});

router.get('/', async (req, res) => {
    res.send(await Poll.find());
});

router.delete('/', async (req, res) => {
    console.log(req.body.url);
    let poll = await find_poll_by_url(req.body.url);
    if(!poll) {
        res.send("Url not found");
    } else if (req.body.pin === poll.core.pinCreator) {
        Poll.findByIdAndDelete(poll._id);
    } else {
        res.status(404).send("Not found.");
    }
});

module.exports = router;
