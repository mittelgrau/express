const Joi = require('@hapi/joi');

const loginValidation = data => {
    const schema = {
        password: Joi.string().required()
    };
    return schema.validate(data);
};

module.exports = {
    loginValidation
} 