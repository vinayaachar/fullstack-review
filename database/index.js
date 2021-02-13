const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fetcher');
const Schema = mongoose.Schema;

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected');
})

const repoSchema = new Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  owner: {
    login: String,
    url: String,
    repos_url: String
  },
  created_at: {type: Date, default: Date.now},
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number,
  svn_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (gitProfile, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  gitProfile.forEach(profile => {
    const id = profile.id;
    const name = profile.name;
    const login = profile.owner.login;
    const url = profile.owner.url;
    const repos_url = profile.owner.repos_url;
    const owner = {
      login,
      url,
      repos_url
    };
    const created_at = profile.created_at;
    const stargazers_count = profile.stargazers_count;
    const watchers_count = profile.watchers_count;
    const forks_count = profile.forks_count;
    const svn_url = profile.svn_url;


    Repo.findOne({name: name}, (err, data) => {
      if (err) console.log(err);
      if(data) cb(`${owner.login} repos updated or already exists`);
      else {
        const repo = new Repo({
          id,
          name,
          owner,
          created_at,
          stargazers_count,
          watchers_count,
          forks_count,
          svn_url
        });
        repo.save()
          .then((item) => console.log('Repos added'))
          .catch(err => cb(err));
      }
    })


  })
  cb(null, `${owner.login} repos added`);
}

module.exports = {
  save,
  Repo
}