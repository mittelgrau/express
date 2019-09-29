const express = require('express');
const got = require('got');
const router = express.Router();
const { fileToJson } = require('../helpers.js');

router.get('/entries', async (req, res) => {
  const url =
    'https://api.github.com/repos/mittelgrau/node_db/contents/_data?ref=master';
  const raw = await got(url, {
    headers: {
      Authorization: `token ${process.env.GITTOKEN}`
    }
  });

  const download_links = JSON.parse(raw.body).map(item => item.download_url);

  const files = await download_links.reduce(async (acc, url) => {
    const collection = await acc;
    let page = await got(url);
    let body = page.body;
    let pageObject = fileToJson(body);

    collection.push(pageObject);

    return collection;
  }, Promise.resolve([]));

  res.send(files);
});

;
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
