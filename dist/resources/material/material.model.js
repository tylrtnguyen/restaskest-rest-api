"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Material = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
let materialSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 255
  },
  quantity: {
    type: Number,
    required: true
  },
  stockStatus: {
    type: String,
    required: true
  }
});

const Material = exports.Material = _mongoose2.default.model('material', materialSchema);