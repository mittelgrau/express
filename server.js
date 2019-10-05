const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { catchErrors } = require('./helpers.js');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser());

const nanoid = require('nanoid');
const jwt = require('jsonwebtoken');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.get('/', (req, res) => {
    res.send('test');
});

const authRouter = require('./routes/authenticate');
// app.use('/auth', catchErrors(authRouter));
app.use('/auth', authRouter);

// req.cookies

app.post('/login', async (req, res) => {
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

    res.status(200).send(req.cookies);
});

app.get('/test', async (req, res) => {
    const token = req.cookies;
    res.send(token);
});

const gitRouter = require('./routes/github');
app.use('/api', gitRouter);

app.post('/authenticate', (req, res) => {
    res.send(req.body);
});

const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});
