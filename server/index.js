const express = require('express');
let app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('dotenv').config()

let github = require('../helpers/github.js');
app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log('request', req.body.username);
  github.getReposByUsername(req.body.username);

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

