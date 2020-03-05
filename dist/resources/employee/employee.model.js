"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Employee = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  address: {
    type: String
  },
  DOB: {
    type: String
  },
  wages: {
    type: Number
  },
  JoinDate: {
    type: String,
    default: Date.now
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already taken"],
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 8
  }
});

const Employee = exports.Employee = _mongoose2.default.model('employee', employeeSchema);