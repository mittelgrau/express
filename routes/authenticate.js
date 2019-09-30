const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const nanoid = require('nanoid');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookie = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

async function decrypt(password) {
  try {
    return await argon2.verify(process.env.PASSWORD, password);
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
    res.send(req.cookies);
    // if (!decrypt(req.body.password)) return res.status(403).send('not allowed');

    // const payload = {
    //   id: nanoid()
    // };

    // const token = jwt.sign(payload, process.env.JWT_SECRET);

    // const cookieOptions = {
    //   httpOnly: true,
    //   expires: 0
    // };

    // res.cookie('auth_token', token, cookieOptions);
    // res.status(401).send('okay');
  }
);

router.get('/test', (req, res) => {
  const cooki = req.cookies;
  // const verified = jwt.verify(req.cookies, process.env.JWT_SECRET, function(err,token){
  // if(err) {
  //  res.status(403).send('Your authentication seems to be wrong);
  //} else{
  //res.send('hiiiii bro')
  //}
  //})
  res.status(400).send(cooki);
});

module.exports = router;
