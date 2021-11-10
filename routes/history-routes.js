const express = require('express');
const {History} = require('../models/history-model');
const {body, validationResult} = require("express-validator");

const historyRouter = express.Router()

historyRouter.get('/api/history', async (req, res) => {
   try{
       const history = await History.find({}, {}, {sort: {createdAt: -1}});
       res.status(200).send(history);
   }catch(err){
       res.status(500).send()
   }
});

historyRouter.post('/api/history',
    [
        body('videoUrl')
            .notEmpty(),
        body('createdAt')
            .notEmpty()
    ],
    async (req, res) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // reading request body
    const {videoUrl,createdAt} = req.body;
    // try to storing the history
    try{
        const history = new History({videoUrl: videoUrl, createdAt: createdAt});
        await history.save();
        res.send(history);
    }catch(err) {
        // send 500 if there is a server error while storing
        res.status(500).send(null);
    }
})
module.exports = {
    historyRouter
}

