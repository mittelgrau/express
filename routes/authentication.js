const express = require('express');
const router = express.Router();
const nanoid = require('nanoid');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
require('dotenv').config();
const { comparePasswords,hashPassword } = require('../controller/authentication/');

router.post('/login',async (req, res,next) => {

    console.log(req.body.password);
    try {
        const hash = await argon2.hash(req.body.password);
        const copy = '$argon2i$v=19$m=4096,t=3,p=1$mHqsUd6Mqhzj9MUvHu8clQ$08NBCqM8dw4oGtlhAWYr92sJRtmh78nbt+TrfNxracE';
        const env = process.env.SAMPLEPASSWORD;
        const hm = await argon2.verify(copy, req.body.password)
        res.send(`${hm} ìt works but -> ${env} and -> ${copy}`);
      } catch (err) {
        
      }

    // hashPassword(req.body.password);
    // console.log(process.env.SAMPLEPASSWORD);
    // const compare = await comparePasswords(req.body.password)

    

    // if (await comparePasswords(req.body.password)) {
    //     res.send('passwörter sind gleich');
        // let err = new Error('Acess not allowed');
        // err.statusCode = 403;
        // next(err);
    // } else {
    //     res.send('kein zutritt');
    //     console.log('yes!')
    // }
        // const payload = {
        //     id: 'nanoid'
        // };
    
    //     const token = JWT.sign(payload, process.env.JWT_SECRET);

    //     const cookieOptions = {
    //         httpOnly: true,
    //         expires: 0,
    //         sameSite: 'Lax',
    //         path: '/'
    //     };

    //     res.cookie('auth_token', token, cookieOptions);

    //     res.status(200).json({
    //         message: "Ok we're in"
    //     });
    // }
});


// app.post('/', async (req, res) => {
//     // {error} = loginValidation(req.body);
//     if (req.body.password !== process.env.SAMPLEPASSWORD) {
//         return res.status(403).send('not allowed');
//     }

//     const payload = {
//         id: nanoid()
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET);

//     res.cookie('auth_token', token, {
//         httpOnly: true,
//         expires: 0,
//         sameSite: 'Lax',
//         path: '/'
//     });

//     res.cookie('rememberme', '1', {
//         expires: new Date(Date.now() + 900000),
//         httpOnly: true
//     });

//     res.status(200).send(req.cookies);
// });


// const { celebrate, Joi, errors } = require('celebrate');

// router.post('/login', async (req, res) => {
//     // {error} = loginValidation(req.body);
//     if (req.body.password !== process.env.SAMPLEPASSWORD) {
//         return res.status(403).send('not allowed');
//     }

//     const payload = {
//         id: '30'
//     };

//     const token = jwt.sign(payload, process.env.JWT_SECRET);

//     res.cookie('auth_token', '1', {
//         sameSite: 'Lax',
//         expires: 0,
//         httpOnly: true,
//         path: '/'
//     });

//     // res.cookie('rememberme', '1', {
//     //     expires: 0,
//     //     httpOnly: true,
//     //     path: '/'
//     // });

//     res.status(200).send('hm, not quite sure');
// });


module.exports = router;