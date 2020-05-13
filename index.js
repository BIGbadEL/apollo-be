var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { questionSchema, Question } = require('./model/question');
const { PollSchema, Poll } = require('./model/poll');
const { coreSchema, Core } = require('./model/core');
const { settingsSchema, Settings } = require('./model/settings');

mongoose
    .connect('mongodb+srv://apollo-io:io_Projekt@io-projekt-4qiaf.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
        .then(() => {
            const app = express();
            const port = 3000;

            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(express.json());
            app.get('/' ,(req, res) => {
                res.send('Hello World!');
            });
            app.post('/', async (req, res) => {
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
            app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));
        });






