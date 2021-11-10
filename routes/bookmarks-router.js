const express = require('express');
const {Bookmark} = require('../models/bookmark-model');
const {body, validationResult} = require("express-validator");

const bookmarkRouter = express.Router()

bookmarkRouter.get('/api/bookmark', async (req, res) => {
    try{
        const bookmarks = await Bookmark.find({}, {}, {sort: {createdAt: -1}});
        res.status(200).send(bookmarks);
    }catch(err){
        console.log(err);
        res.status(400).send({err})
    }
});

bookmarkRouter.post('/api/bookmark', [
        body('videoUrl')
            .notEmpty(),
        body('createdAt')
            .notEmpty(),
    ]
    ,async (req, res) => {

    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // reading the request body
    const {videoUrl, createdAt} = req.body;
        // try to storing the bookmark
   try{
       const bookmark = new Bookmark({videoUrl: videoUrl, createdAt: createdAt});
       await bookmark.save();
       res.send(bookmark);
   }catch(err){
       res.status(500).send(null);
   }
})

bookmarkRouter.delete('/api/bookmark'
    ,async (req, res) => {
        // validation

        if (!req.query.url) {
            return res.status(400).json('PROVIDE AN URL');
        }

        // try to storing the bookmark
        try{
            await Bookmark.deleteOne({videoUrl: req.query.url});
            res.send();
        }catch(err){
            res.status(500).send(null);
        }
    })
module.exports = {
    bookmarkRouter
}

