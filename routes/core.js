const express = require('express');
const { questionSchema, Question } = require('../model/question');
const { PollSchema, Poll } = require('../model/poll');
const { coreSchema, Core } = require('../model/core');
const { settingsSchema, Settings } = require('../model/settings');

const router = express.Router();

const adjectives = ["affable", "affectionate", "agreeable", "ambitious", "amiable", "amicable", "amusing", "brave", 
    "bright", "calm", "careful", "charming", "communicative", "compassionate", "conscientious", "considerate", "convivial", 
    "courageous", "courteous", "creative", "decisive", "determined", "diligent", "diplomatic", "discreet", "dynamic", 
    "easygoing", "emotional", "energetic", "enthusiastic", "exuberant", "faithful", "fearless", "forceful", "frank", 
    "friendly", "funny", "generous", "gentle", "good", "helpful", "honest", "humorous", "imaginative", "independent", "intellectual", 
    "intelligent", "intuitive", "inventive", "kind", "loving", "loyal", "modest", "neat", "nice", "optimistic", "passionate", "patient", 
    "philosophical", "placid", "plucky", "polite", "powerful", "practical", "quiet", "rational", "reliable", "reserved", "resourceful", 
    "romantic", "sensible", "sensitive", "shy", "sincere", "sociable", "straightforward", "sympathetic", "thoughtful", "tidy", "tough", 
    "unassuming", "understanding", "versatile", "warmhearted", "willing", "witty"];

const animals = ["dog", "cat", "tiger", "lion", "panda", "cheetah", "axolotl", "wolf", "okapi", "octopus", "beaver", "hedgehog", "narwhal", 
    "lizard", "frog", "turtle", "squid", "dolphin", "monkey", "shark", "deer", "giraffe", "fox", "chimpanzee", "squirrel", "koala", "kangaroo", 
    "gorilla", "leopard", "rhinoceros", "chipmunk", "camel", "possum", "otter", "raccoon", "hippopotamus", "mole", "owl", "elephant", "mouse", 
    "horse", "sheep", "wombat", "bison", "rabbit", "zebra"];
    
function generate_url() {
    return adjectives[Math.floor(Math.random() * adjectives.length)] + 
    "-" + adjectives[Math.floor(Math.random() * adjectives.length)] + 
    "-" + animals[Math.floor(Math.random() * animals.length)]
}

async function is_url_in_db(url) {
    const result = await Poll.find();
    for(let i = 0; i < result.length; i++){
        if (result[i].core.url === url){
            return false;
        }
    }
    return true;
}

async function generate_unique_url() {
    let result = '';
    do {
        result = generate_url();
        console.log(result);
    } while(!(await is_url_in_db(result)));
    return result;
}

router.get('/new', async (req, res) => {
    let dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + 7);
    const poll = new Poll({
        core: new Core({
            pinUser: Math.floor((Math.random() * (9999 - 1000)) + 1000),
            pinCreator: Math.floor((Math.random() * (9999 - 1000)) + 1000),
            url: await generate_unique_url()
        }),
        questions: [],
        settings: new Settings({
            requireSignature: false,
            resultsAccess: true,
            sendSummary: false,
            email: "",
            expire: dateObj
        })
    });
    console.log(poll.settings);
    await poll.save()
    res.send(poll.core);
});

async function find_poll_by_url(url) {
    const result = await Poll.find();
    for(let i = 0; i < result.length; i++){
        if (result[i].core.url === url){
            return result[i];
        }
    }
    return false;
}

router.post('/login', async (req, res) => {
    console.log(req.body.url);
    let poll = await find_poll_by_url(req.body.url);
    if(!poll){
        res.status(404).send("Not found.");
    } else if (poll.core.pinUser === req.body.pin) {
        res.send( { "isCreator": false } );
    } else if (poll.core.pinCreator === req.body.pin) {
        res.send( { "isCreator": true } );
    } else {
        res.status(404).send("Wrong pin.");
    }
});


router.get('/:url', async (req, res) => {
    const result = await find_poll_by_url(req.params.url);
    if(result){
        res.send(result.core);
    } else {
        res.status(404).send("Not found.");
    }
});

router.get('/', async (req, res) => {
    const result = (await Poll.find()).map(poll => poll.core);
    res.send(result);
});


module.exports = router;
