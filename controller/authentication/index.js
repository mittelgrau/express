const nanoid = require('nanoid');
const JWT = require('jsonwebtoken');
const argon2 = require('argon2');
require('dotenv').config();
const {hashed} = require('../../config.js');


const guard = (req, res, next) => {
    
    const token = req.cookies.auth_token;

    if (!token) {
        let err = new Error('Need to Log in');
        err.statusCode = 403;
        next(err);
    }

    JWT.verify(token, process.env.JWT_SECRET, (err, token) => {
        if (err) {
            let err = new Error('Not a valid acess-token');
            err.statusCode = 403;
            next(err);
        } else {
            next();
        }
    });
};



async function hashPassword(password) {
    try {
        const hash = await argon2.hash(password);
      } catch (err) {
        throw new Error(err);
      }
}

async function comparePasswords(password) {
    return await argon2.verify(hashed, password);
}

module.exports = {
    comparePasswords,
    hashPassword,
    guard
}
