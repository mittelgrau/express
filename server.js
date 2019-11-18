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
require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(cookie());
app.use(helmet());
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));

const routes = require('./routes/index');
app.use('/', routes);

app.use((err, req, res, next) => {
    console.log(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send('No Site this way');
})

const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});
