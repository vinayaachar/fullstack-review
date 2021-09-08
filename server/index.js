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

// Redis requirements

const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

// Set response
function setResponse(username, repos) {
  return `<h2>${username} has ${repos} these many Github repos</h2>`;
}

const redisFunc = async (req, res, next) => {
  try {
    console.log('Fetching Data from remote Git');
    const { username } = req.params;

    const response = await fetch(`https://api.github.com/users/${username}`);

    const data = await response.json();

    console.log('redis', data);

    const repos = data.public_repos;




    // Set data to Redis
    client.setex(username, 3600, repos);

    res.send(setResponse(username, repos));
  } catch (err) {
    console.log(err);
  }
 }

 function cache(req, res, next) {
  const { username } = req.params;
  console.log(username)
   client.get(username, (err, data) => {
     if (err) throw err;

     if (data !== null) {
       console.log('Data found in local Cache')
       res.send(setResponse(username, data))
     } else {
       next();
     }
   })
 }

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var gitProfile = github.getReposByUsername(req.body.username);
  gitProfile.then(response => {
    mongoDatabase.save(response, (err, data) => {
      if (err) console.log(err);
      res.status(200).send(data);
    });
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  Repo.Repo.find(
    {stargazers_count : {$gt: 50}}
  ).limit(25).sort({stargazers_count: -1})
    .then(repos => res.json(repos))
    .catch(err => console.log(err))
});

app.get('/redis/:username', cache, redisFunc);

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

