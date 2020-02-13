"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _restaurant = require("../restaurant/restaurant.model");

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
  restaurants: [_restaurant.Restaurant],
  date: {
    type: Date,
    default: Date.now
  }
});
exports.default = _mongoose2.default.model('manager', managerSchema);