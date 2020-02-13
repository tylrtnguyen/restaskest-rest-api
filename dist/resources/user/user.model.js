"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 255
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 8
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const User = exports.User = _mongoose2.default.model('user', userSchema);