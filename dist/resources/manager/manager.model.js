"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Manager = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _mongooseUniqueValidator = require("mongoose-unique-validator");

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
const managerSchema = new Schema({
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
  salary: {
    type: Number
  },
  JoinDate: {
    type: String,
    default: (0, _moment2.default)().format('ll')
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
  restaurants: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Restaurant"
  }],
  date: {
    type: Date,
    default: Date.now
  }
});
managerSchema.plugin(_mongooseUniqueValidator2.default, {
  message: 'Email is already taken'
});

const Manager = exports.Manager = _mongoose2.default.model('manager', managerSchema);