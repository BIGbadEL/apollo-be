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

router.put('/:url', async (req, res) => {
    console.log(req.params.url);
    let old_poll = await find_poll_by_url(req.params.url);
    if(!old_poll){
        res.send("Url not found");
    }
    res.send("OK");
});

router.get('/:url', async (req, res) => {
    res.send(await find_poll_by_url(req.params.url));
});

router.get('/', async (req, res) => {
    res.send(await Poll.find());
});

router.delete('/', (req, res) => {

});

module.exports = router;
