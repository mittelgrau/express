const nanoid = require('nanoid');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const {password}

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
        bcrypt.hash(password, 10).then(function(hash) {
           console.log(hash);
        });
      } catch (err) {
        throw new Error(err);
      }
}

async function comparePasswords(password) {
    return await bcrypt.compare(password, process.env.SAMPLEPASSWORD);
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
