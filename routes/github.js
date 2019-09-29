const express = require('express');
const router = express.Router();

const postFile = async data => {
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

module.exports = router;
