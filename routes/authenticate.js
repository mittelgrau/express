const express = require('express');
const router = express.router();
const argon2 = require('argon2');
require('dotenv').config();
const cookie = require('cookie-parser');

async function decrypt(password) {
  try {
    return (verify = await argon2.verify(process.env.PASSWORD, password));
  } catch (err) {
    return error;
  }
};




module.exports = router;