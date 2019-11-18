const nanoid = require('nanoid');
const JWT = require('jsonwebtoken');
const argon2 = require('argon2');
require('dotenv').config();

const guard = (req, res, next) => {
    const token = req.cookies.auth_token;

    if (!token) {
        let err = new Error('Please use the correct login');
        err.statusCode = 403;
        next(err);
    }

    const verified = JWT.verify(token, process.env.JWT_SECRET, (err, token) => {
        if (err) {
            let err = new Error('Your acess-token was manipulated and is not valid anymore please visit /login');
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
    try {
        return await argon2.verify(process.env.SAMPLEPASSWORD, password);
      } catch (err) {
        throw new Error(err)
      }
}

module.exports = {
    comparePasswords,
    hashPassword,
    guard
}

// module.exports = (fn) => {
//     return (err, req, res, next) => {
//         Promise.resolve(fn(req, res, next)).catch(next);
//     };
// };
