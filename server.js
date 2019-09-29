const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookie = require('cookie-parser');
const argon2 = require('argon2');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
app.use()


app.get('/', (req, res) => {
  res.send('test');
});

app.post('/authenticate', (req,res) => {
  res.send(req.body);
});

app.get('/nah', function(req, res) {
    fetch('https://api.github.com/repos/mittelgrau/node_db/contents/db.json', {
        method: 'put',
        headers: {
            Authorization: `token ${process.env.GITTOKEN}`
        },
        body: JSON.stringify({
            message: 'Adding a new Repo',
            committer: {
                name: 'Automatic post',
                email: 'mtlgr.dev@gmail.com'
            },
            content: newObj,
            sha: 'a6e141486fb5e5d6d75f084eae3f379fd21e36c2'
        })
    })
        .then(raw => raw.json())
        .then(data => res.send(data))
        .catch(err => res.send(err));
});



// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
