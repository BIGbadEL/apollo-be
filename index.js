var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://apollo-io:io_Projekt@io-projekt-4qiaf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const app = express();
const port = 3000;
client.connect(err => {
  if (err) return console.error(err);
  console.log('Connected to Database');
  const db = client.db('apollo-db');
  //const quotesCollection = db.collection('questions');


  app.use(bodyParser.urlencoded({ extended: true }));
  app.get('/', (req, res) => res.send('Hello World!'));
  app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

   client.close();
});




