const express = require('express');
const { ratingSchema, Rating } = require('../model/rating');


const router = express.Router();

router.post('/', async (req, res) => {
    const rating = new Rating({
        url: req.body.url,
        rating: req.body.rating
    });
    await rating.save();
    res.send("OK");
});

router.get('/', async (req, res) => {
    res.send(await Rating.find());
});

module.exports = router;
