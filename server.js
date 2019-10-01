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

app.use(cors());

app.get('/', (req, res) => {
    res.send('test');
});

const authRouter = require('./routes/authenticate');
// app.use('/auth', catchErrors(authRouter));
app.use('/auth', authRouter);

// req.cookies

const gitRouter = require('./routes/github');
app.use('/api', gitRouter);

app.post('/authenticate', (req, res) => {
    res.send(req.body);
});

const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});
