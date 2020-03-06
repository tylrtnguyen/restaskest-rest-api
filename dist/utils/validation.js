"use strict";

var _joi = require("@hapi/joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const registerValidation = userInput => {
  const schema = _joi2.default.object({
    fName: _joi2.default.string().required(),
    lName: _joi2.default.string().required(),
    address: _joi2.default.string(),
    DOB: _joi2.default.string().required(),
    salary: _joi2.default.number(),
    email: _joi2.default.string().min(8).required().email(),
    password: _joi2.default.string().min(8).required()
  });

  return schema.validate(userInput);
};

const loginValidation = userInput => {
  const schema = _joi2.default.object({
    email: _joi2.default.string().min(8).required().email(),
    password: _joi2.default.string().min(8).required()
  });

  return schema.validate(userInput);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;