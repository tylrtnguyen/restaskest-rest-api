import Joi from '@hapi/joi'

const registerValidation = (userInput) => {
    const schema = Joi.object({
        fName: Joi.string().required(),
        lName: Joi.string().required(),
        restaurantName: Joi.string().required(),
        restaurantAddress: Joi.string().required(),
        pos: Joi.string().required(),
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