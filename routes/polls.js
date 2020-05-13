const express = require('express');
const { Pool, PoolSchema } = require('../model/poll');
const { Core, coreSchema } = require('../model/core');
const { Question, questionSchema } = require('../model/question');

const router = express.Router();

router.post('/', (req, res) => {

    const pool = new Pool({
        
    });
});

router.get('/', (req, res) => {

});

router.delete('/', (req, res) => {

});










module.exports = router;
