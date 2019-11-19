const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookie = require('cookie-parser');
const helmet = require('helmet');
const { catchErrors } = require('./helpers.js');
const session = require('express-session');
const nanoid = require('nanoid');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookie());
app.use(helmet());
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));

const routes = require('./routes/index');
app.use('/', routes);

app.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500;
    if (!error.message) error.message = 'Server Side Error'
    res.status(error.statusCode).send(error.message);
})

const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});
