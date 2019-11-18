const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const guard = (req, res, next) => {
    
    const token = req.cookies.auth_token;

    if (!token) {
        let err = new Error('Need to Log in');
        err.statusCode = 403;
        next(err);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, token) => {
        if (err) {
            let err = new Error('Not a valid acess-token');
            err.statusCode = 403;
            next(err);
        } else {
            next();
        }
    });
};

module.exports.guard;