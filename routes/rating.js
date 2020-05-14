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

module.exports = router;
