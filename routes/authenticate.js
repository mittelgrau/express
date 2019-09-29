const express = require('express');
const router = express.router();
const argon2 = require('argon2');
const nanoid = require('nanoid');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookie = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

async function decrypt(password) {
  try {
    return (verify = await argon2.verify(process.env.PASSWORD, password));
  } catch (err) {
    return false;
  }
}

router.post(
  '/login',
  celebrate({
    body: Joi.object().keys({
      password: Joi.string().required()
    })
  }),
  (req, res) => {
    if (!decrypt(req.body.password)) return res.status(403).send('not allowed');

    const payload = {
      id: nanoid()
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    const cookieOptions = {
      httpOnly: true,
      expires: 0
    };

    res.cookie('auth_token', token, cookieOptions);
    res.status(401).send('okay');
  }
);

router.get(
  '/test',
  celebrate({
    cookies: Joi.object({
      auth_token: Joi.string().required()
    })
  }),
  (req, res) => {
    res.send("we're in");
  }
);

module.exports = router;
