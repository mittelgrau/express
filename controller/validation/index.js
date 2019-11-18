const Joi = require('@hapi/joi');

const loginValidation = data => {
    const schema = {
        password: Joi.string().required()
    };
    return Joi.validate(data, schema);
};

module.exports = {
    loginValidation
} 