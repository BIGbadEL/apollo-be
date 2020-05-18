var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const polls = require('./routes/polls');
const cores = require('./routes/core');
const answer = require('./routes/answer');
const rating = require('./routes/rating');
const results = require('./routes/results');
mongoose
    .connect('mongodb+srv://apollo-io:io_Projekt@io-projekt-4qiaf.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
        .then(async () => {});
        
        const app = express();
        const port = 3000;

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(cors());
        app.use('/api/poll', polls);
        app.use('/api/core', cores);
        app.use('/api/answer', answer);
        app.use('/api/rating', rating);
        app.use('/api/results', results);
        app.get('/' ,(req, res) => {
            res.send('Hello World!');
        });
        app.post('/', async (req, res) => {
            res.send("OK");
        });
        const server = app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));
        exports.server = server;

//////////////////////////////////////////////////////////////////////////////

"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "greg090912@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world? XD", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);

//////////////////////////////////////////////////////////////////////////////




