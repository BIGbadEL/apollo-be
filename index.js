var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const polls = require('./routes/polls');
const cores = require('./routes/core');

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
            app.use('/api/polls', polls);
            app.use('/api/core', cores);
            app.get('/' ,(req, res) => {
                res.send('Hello World!');
            });
            app.post('/', async (req, res) => {
                res.send("OK");
            });
            app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));
        });






