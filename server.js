const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookie = require('cookie-parser');
const helmet = require('helmet');
const { catchErrors } = require('./helpers.js');
const session = require('express-session');
require('dotenv').config();


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookie());
app.use(helmet());

const nanoid = require('nanoid');
const jwt = require('jsonwebtoken');

app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));

app.get('/', (req, res) => {
    res.send('test');
});

app.post('/', (req, res) => {
    res.cookie('auth_token', 'testing', {
        domain: 'http://localhost:8080',
        sameSite: 'Lax',
        expires: 0,
        httpOnly: false,
        path: '/'
    });
    res.send('added cookie');
});

// const authRouter = require('./routes/authenticate');

// app.use('/auth', authRouter);


// app.post('/login', async (req, res) => {
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

// app.get('/test', async (req, res) => {
//     const token = req.cookies;
//     res.send(token);
// });

// const gitRouter = require('./routes/github');
// app.use('/api', gitRouter);

// app.post('/authenticate', (req, res) => {
//     res.send(req.body);
// });

// const routes = require('./routes/index');
// app.use('/', routes);

app.use((err, req, res, next) => {
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send('No Site this way');
})

const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});
