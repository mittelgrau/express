const express = require('express');
const router = express.Router();

router.post('/login', (req,res) => {
    res.cookie('auth_token', 'testing', {
        sameSite: 'Lax',
        expires: 0,
        httpOnly: true,
        path: '/'
    }).send('still sending a cookie');

});

app.post('/', async (req, res) => {
    // {error} = loginValidation(req.body);
    if (req.body.password !== process.env.SAMPLEPASSWORD) {
        return res.status(403).send('not allowed');
    }

    const payload = {
        id: nanoid()
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.cookie('auth_token', token, {
        httpOnly: true,
        expires: 0,
        sameSite: 'Lax',
        path: '/'
    });

    res.cookie('rememberme', '1', {
        expires: new Date(Date.now() + 900000),
        httpOnly: true
    });

    res.status(200).send(req.cookies);
});


module.exports = router;