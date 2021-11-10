const mongoose = require("mongoose");


const BookmarkSchema = new mongoose.Schema({
    createdAt: Date,
    videoUrl: String
}, {toJSON: {
    transform(doc, ret){
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
    }});


const Bookmark = mongoose.model('bookmark', BookmarkSchema);

module.exports = {
    Bookmark
}

