const express = require('express');
const router = express.Router();
const nanoid = require('nanoid');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const { comparePasswords } = require('../controller/authentication/');
const { loginValidation } = require('../controller/validation');
const {jwt_secret} = require('../config.js');


router.post('/login', async (req, res,next) => {

    // 1. check c

    // 1. Compare body password with hashed password
    if (!(await comparePasswords(req.body.password))) {
        // throw error if passwords are not the same
        let err = new Error('Access not allowed');
        err.statusCode = 403;
        next(err);
    } else {
        
        // 2. Create signed jwt and attach it to a cookie
        // create payload for jwt am besten uuid from found user or random
        const payload = {
            id: nanoid()
        };
        
        const token = jwt.sign(payload, jwt_secret);
        
        const cookieOptions = {
            expires: 0,
            sameSite: 'Lax',
            httpOnly: true,
            path: '/'
        };
        
        // 3. Attach Cookie to response
        res.cookie('auth_token', token, cookieOptions);

        // 4. Redirect or give message
        res.status(200).send('token attached')        
    }
});



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