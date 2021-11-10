const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const {historyRouter} = require("./routes/history-routes");
const {bookmarkRouter} = require("./routes/bookmarks-router");
const app = express();

console.clear();
app.use(cors());
// to parse json body
app.use(express.json());
app.use(historyRouter);
app.use(bookmarkRouter)

mongoose.connect('mongodb://localhost:3333/video-player', {
    auth: {
        username: 'admin',
        password: 'password'
    },
    authSource: 'admin'
}, (error) => {
    if (error)
        throw error;
    console.log('CONNECTED TO DB SUCCESSFULLY!')
})

app.listen(8000, () => {
    console.log('APP IS RUNNING ON PORT 8000')
})
