const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const {
    authenticate
} = require('../controller/auth');

router.get('/', (req, res) => {
    const token = req.cookies;
    res.send(token);    
});

router.post('/login', (req, res,next) => {
    // check if password is true?
    if (req.body.password !== process.env.PASSWORD) {
        let err = new Error('Acess not allowed');
        err.statusCode = 403;
        next(err);
    } else {
        const payload = {
            id: 'nanoid'
        };

        const token = JWT.sign(payload, process.env.JWT_SECRET);

        const cookieOptions = {
            httpOnly: true,
            expires: 0,
            sameSite: 'Lax',
            path: '/'
        };

        res.cookie('auth_token', token, cookieOptions);

        res.status(200).json({
            message: "Ok we're in"
        });
    }
});

router.get('/test', authenticate, (req, res) => {
    res.send("Boys we're inside")
});

const githubRoutes = require('./github.js');
router.use('/api', githubRoutes);


module.exports = router;
