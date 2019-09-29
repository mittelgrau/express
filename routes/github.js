const express = require('express');
const got = require('got');
const router = express.Router();

router.get('/entries', async (req, res) => {
  const url = 'https://api.github.com/repos/mittelgrau/node_db/_data';
  const raw = await got(url, {
    headers: {
      Authorization: `token ${process.env.GITTOKEN}`
    }
  });
  console.log(raw);
});

const postFile = async data => {
  const url =
    'https://api.github.com/repos/mittelgrau/node_db/contents/db.json';
  const payload = {
    message: 'new shared link',
    content: Buffer.from(fileContent).toString('base64'),
    comitter: {
      name: '',
      email: ''
    }
  };

  const options = {
    method: 'PUT',
    headers: {
      Authorization: `token ${process.env.GITTOKEN}`
    },
    body: Json.stringify(payload)
  };

  return await fetch(url, options);
};

async function testing() {
  fetch('', {
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
}

module.exports = router;
