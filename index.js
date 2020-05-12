var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');


const Cat = mongoose.model('Cat', { name: String });
mongoose
    .connect('mongodb+srv://apollo-io:io_Projekt@io-projekt-4qiaf.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true, 
        useUnifiedTopology: true})
        .then(() => {
            const app = express();
            const port = 3000;


            app.use(bodyParser.urlencoded({ extended: true }));
            app.get('/', (req, res) => {
                const kitty = new Cat({ name: 'Zildjian' });
                kitty.save().then(() => console.log('meow'));
                res.send('Hello World!');
            });
            app.post('/', (req, res) => {
                const doggy = new Dog({ name: 'Gama' });
                doggy.save().then(() => console.log('Woof'));
            });
            app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));
        });






