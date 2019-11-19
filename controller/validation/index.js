const Joi = require('@hapi/joi');

const loginValidation = (req,_res,next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().required(),
    });
    
    const {error} = schema.validate(req.body);
    if(error) {
        let err = new Error(error.details[0].message);
        err.statusCode = 403;
        next(err);
    } else next();
};

module.exports = {
    loginValidation
} 