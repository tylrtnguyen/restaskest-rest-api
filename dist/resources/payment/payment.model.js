"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
let paymentSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  arrival_date: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  failure_message: {
    type: String
  },
  failure_code: {
    type: Number
  },
  source_type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});
exports.default = _mongoose2.default.model('payment', paymentSchema);