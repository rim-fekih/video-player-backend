const mongoose = require("mongoose");


const HistorySchema = new mongoose.Schema({
    createdAt: Date,
    videoUrl: String
}, {toJSON: {
    transform(doc,ret){
        // remove sensitive data from response
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
    }
    }});


const History = mongoose.model('history', HistorySchema);

module.exports = {
    History
}
