const express = require('express');
var cron = require('node-cron');
 
const { questionSchema, Question } = require('../model/question');
const { PollSchema, Poll } = require('../model/poll');
const { coreSchema, Core } = require('../model/core');
const { settingsSchema, Settings } = require('../model/settings');
const { answerSchema, Answer } = require('../model/answer');

const router = express.Router();

async function find_poll_by_url(url) {
    const result = await Poll.find();
    for(let i = 0; i < result.length; i++){
        if (result[i].core.url === url) {
            return result[i];
        }
    }
    return false;
}

"use strict";
const nodemailer = require("nodemailer");

async function get_results(url){
    const poll = await find_poll_by_url(url);
    const result = poll ? await Promise.all(poll.questions.map(async element => {
        const answers = await Answer.find({ questionId: element._id });
        console.log(element._id, element.value , answers);
        return {
            title: element.value,
            type: element.type,
            total: answers.length,
            answers: element.type === 'text' ? answers.map(ans => ans.value).flat() : element.options.map(answer => ({
                value: answer,
                count: answers.reduce((acc, val) => acc + val.value.includes(answer), 0)
            }))
        }
    })) : [];
    return result;
}


async function send_email(poll) {
    let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: 'apollo.ankiety@gmail.com', 
        pass: 'io-Projekt', 
    },
    });

    const result = await get_results(poll.core.url);
    if(result.length == 0)
        return;
    let total = 0;
    for(let i = 0; i < result.length; i++) {
        total += result[i].total;
    }
    let text = `
Twoja ankieta ${poll.core.url} dobiegła właśnie końca.
Zobaczmy jak przedstawia się w liczbach. 
Łącznie na wszystkie pytania padło ${total} odpowiedzi!
`;

console.log(result);

    for(let i = 0; i < result.length; i++) {
        if(result[i].type === 'text'){
            text += `
Pytanie otwarte “${result[i].title}” otrzymało ${result[i].total} odpowiedzi. Oto one: 
            `;
            for(let j = 0; j < result[i].answers.length; j++){
                text += `
    ${result[i].answers[j]}
                `;
            }
        } else {
            const max = result[i].answers.reduce((max, current) => (max.count < current.count) ? current : max);
            text += `
Pytanie “${result[i].title}” otrzymało ${result[i].total} odpowiedzi. 
Najpopularniejszym wyborem okazał się ${max.value}, który otrzymał ${max.count} głosów. 
            `;
        }
    }

text += `
Pozdrawiamy,
Zespół Apollo
`


console.log(text);
  let info = await transporter.sendMail({
    from: 'apollo.ankiety@gmail.com', 
    to: poll.settings.email, 
    subject: "Twoja ankieta dobiegła końca", 
    text: text
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

router.put('/', async (req, res) => {
    console.log(req.body.url);
    console.log(req.body);
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
    for(let i = 0; i < old_poll.questions.length; i++){
        const answers = await Answer.find();
        console.log("Answers: ", answers);
        for(let j = 0; j < answers.length; j++) {
            if(answers[j].questionId == old_poll.questions[i]._id) {
                answers[j].questionId = q[i]._id;
                await Answer.findByIdAndUpdate(answers[j]._id, answers[j]);
            }
        }
    }
    old_poll.questions = q;
    old_poll.settings = new Settings({
        requireSignature: req.body.settings.requireSignature,
        resultsAccess: req.body.settings.resultsAccess,
        sendSummary: req.body.settings.sendSummary,
        email: req.body.settings.email,
        expire: req.body.settings.expire
    });
    await Poll.findByIdAndUpdate(old_poll._id, old_poll);
    console.log(old_poll.questions);
    res.send("OK");
});

router.get('/:url', async (req, res) => {
    res.send(await find_poll_by_url(req.params.url));
});

router.get('/', async (req, res) => {
    let dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - 7);
    const polls = await Poll.find();
    for(let i = 0; i < polls.length; i++){
        polls[i].settings.expired = polls[i].settings.expire < dateObj;
        console.log(polls[i].settings);
    }
    //console.log(polls);
    res.send(polls);
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

cron.schedule('* * * * *', async () => {
    console.log('running a task every minute');
    let dateObj = new Date();
    dateObj.setDate(dateObj.getDate() - 7);
    const to_send = (await Poll.find()).filter(poll => poll.settings.expire < (Date.now()));
    const to_delete = (await Poll.find()).filter(poll => poll.settings.expire < dateObj);
    for(let i = 0; i < to_delete.length; i++) {
        await Poll.findByIdAndDelete(to_delete[i]._id);
    }
    for(let i = 0; i < to_send.length; i++) {
        if(to_send[i].settings.sendSummary) {
            console.log("send: ", to_send[i].settings);
            await send_email(to_send[i]).catch(console.error);
            to_send[i].settings.sendSummary = false;
        }
        await Poll.findByIdAndUpdate(to_send[i]._id, to_send[i]);
    }
    console.log(to_delete);
});

module.exports = router;


