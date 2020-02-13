"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
    type: String,
    min: 8
  },
  wages: {
    type: Number
  },
  JoinDate: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 255
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
exports.default = _mongoose2.default.model('employee', employeeSchema);