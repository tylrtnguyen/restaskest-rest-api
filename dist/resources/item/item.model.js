"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
let itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  materials: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Material"
  }]
});

const Item = exports.Item = _mongoose2.default.model('item', itemSchema);