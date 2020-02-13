"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 8
  },
  role: {
    type: String,
    required: true,
    min: 8
  },
  password: {
    type: String,
    required: true,
    min: 8
  }
});
exports.default = _mongoose2.default.model('admin', adminSchema);