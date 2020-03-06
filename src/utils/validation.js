import Joi from '@hapi/joi'

const registerValidation = (userInput) => {
    const schema = Joi.object({
        fName: Joi.string().required(),
        lName: Joi.string().required(),
        address: Joi.string(),
        DOB: Joi.string().required(),
        salary: Joi.number(),
        email: Joi.string().min(8).required().email(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(userInput);
}

const loginValidation = (userInput) => {
    const schema = Joi.object({
        email: Joi.string().min(8).required().email(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(userInput);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;