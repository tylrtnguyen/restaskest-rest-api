"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Payment = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
let paymentSchema = new Schema({
  stripe_id: {
    type: String,
    required: true
  },
  object_type: {
    type: String,
    required: true
  },
  amount: {
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
  billing_details: {
    type: Object,
    required: true
  },
  paid: {
    type: Boolean,
    required: true
  }
});

const Payment = exports.Payment = _mongoose2.default.model('payment', paymentSchema);