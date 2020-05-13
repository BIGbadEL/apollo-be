const express = require('express');
const { questionSchema, Question } = require('../model/question');
const { PollSchema, Poll } = require('../model/poll');
const { coreSchema, Core } = require('../model/core');
const { settingsSchema, Settings } = require('../model/settings');

const router = express.Router();

router.post('/', async (req, res) => {
    const q = [];
    req.body.poll.questions.forEach(element => {
        q.push(new Question ({
            id: element.id,
            value: element.value,
            options: element.options,
            type: element.type
        }));
    });
    const poll = new Poll({
        core: new Core({
            pinUser: req.body.init.pinUser,
            pinCreator: req.body.init.pinCreator,
            url: req.body.init.url
        }),
        questions: q,
        settings: new Settings({
            requireSignature: req.body.poll.settings.requireSignature,
            resultsAccess: req.body.poll.settings.resultsAccess,
            expire: req.body.poll.settings.expire
        })
    });
    console.log(poll);
    await poll.save();
    res.send("OK");
});

router.get('/', (req, res) => {

});

router.delete('/', (req, res) => {

});

module.exports = router;
