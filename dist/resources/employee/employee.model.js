"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Employee = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _mongooseUniqueValidator = require("mongoose-unique-validator");

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const now = (0, _moment2.default)();
const Schema = _mongoose2.default.Schema;
const employeeSchema = new Schema({
  fName: {
    type: String,
    required: true,
    max: 255
  },
  lName: {
    type: String,
    required: true,
    max: 255
  },
  gender: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  DOB: {
    type: String
  },
  isPermanent: {
    type: Boolean
  },
  wages: {
    type: Number
  },
  JoinDate: {
    type: String,
    default: (0, _moment2.default)().format('YYYY-MM-DD')
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 8
  }
});
employeeSchema.plugin(_mongooseUniqueValidator2.default, {
  message: 'Email is already taken'
});

const Employee = exports.Employee = _mongoose2.default.model('employee', employeeSchema);