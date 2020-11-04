const express = require('express');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 8080;

var teams = require('./routes/teams');
var player = require('./routes/player');

app.get('/', (req, res) => {
    res.status(200).end();
    console.log('Welcome to the thing things ! 🚀');
});

app.use('/teams', teams);
app.use('/player', player);

const server = http.createServer(app);
server.listen(PORT, console.log("Listening on PORT " + PORT + "! 🏝") )
module.exports = server;