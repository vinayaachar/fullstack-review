const express = require('express');
let app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
require('dotenv').config()
let mongoDatabase = require('../database/index.js');
let Repo = require('../database/index.js');

let github = require('../helpers/github.js');
app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var gitProfile = github.getReposByUsername(req.body.username);
  gitProfile.then(response => {
    mongoDatabase.save(response, res);
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  Repo.Repo.find(
    {stargazers_count : {$gt: 50}}
  ).limit(25)
    .then(repos => res.json(repos))
    .catch(err => console.log(err))
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

