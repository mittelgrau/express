const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const nanoid = require('nanoid');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookie = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

router.post(
    '/login',
    celebrate({
        body: Joi.object().keys({
            password: Joi.string().required()
        })
    }),
    async (req, res) => {
        if (req.body.password !== process.env.SAMPLEPASSWORD) {
            return res.status(403).send('not allowed');
        }

        const payload = {
            id: nanoid()
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        const cookieOptions = {
            httpOnly: true,
            expires: 0
        };

        res.cookie('auth_token', token, cookieOptions);
        res.status(200).send('okay');
    }
);

router.get('/test', (req, res) => {
    // const verified = jwt.verify(req.cookies, process.env.JWT_SECRET, function(err,token){
    // if(err) {
    //  res.status(403).send('Your authentication seems to be wrong);
    //} else{
    //res.send('hiiiii bro')
    //}
    //})
    console.log(req.cookies);
    res.status(200).send(req.cookies);
});

module.exports = router;
