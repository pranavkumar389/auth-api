// Validations
const Joi = require('@hapi/joi');

var validationWrapper = {};

validationWrapper.registerValidation = (data) => {
    const registerSchema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6)
    }

    return Joi.validate(data, registerSchema);
}

validationWrapper.loginValidation = (data) => {
    const registerSchema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6)
    }

    return Joi.validate(data, registerSchema);
}

module.exports = validationWrapper;

