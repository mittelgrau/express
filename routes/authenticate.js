const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const nanoid = require('nanoid');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { celebrate, Joi, errors } = require('celebrate');

router.post('/login', async (req, res) => {
    // {error} = loginValidation(req.body);
    if (req.body.password !== process.env.SAMPLEPASSWORD) {
        return res.status(403).send('not allowed');
    }

    const payload = {
        id: nanoid()
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    const cookieOptions = {
        maxAge: 3600,
        httpOnly: true
    };

    res.cookie('auth_token', token, cookieOptions);
    res.status(200).end();
});

router.get('/test', (req, res) => {
    const token = req.cookies.auth_token;
    // const verified = jwt.verify(req.cookies, process.env.JWT_SECRET, function(err,token){
    // if(err) {
    //  res.status(403).send('Your authentication seems to be wrong);
    //} else{
    //res.send('hiiiii bro')
    //}
    //})

    res.status(200).send(token);
});

module.exports = router;
