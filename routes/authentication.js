const express = require('express');
const router = express.Router();
const nanoid = require('nanoid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { comparePasswords,hashPassword } = require('../controller/authentication/');

router.post('/login',async (req, res,next) => {

    const SALT_WORK_FACTOR = 10 
    const compare = await bcrypt.compare(req.body.password, process.env.SAMPLEPASSWORD);
    
    res.send(compare);
    
    
    // bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    //         if (err) return next(err);
    //         // hash the password along with our new salt
    //         bcrypt.hash(req.body.password, salt, function(err, hash) {
    //             if (err) return next(err);
    //             res.send(hash);
    //         });
    // });
    

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