"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Payroll = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require("mongoose-unique-validator");

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
const payrollSchema = new Schema({
  employee_id: {
    type: String,
    unique: true
  },
  file_title: {
    type: String,
    required: true
  },
  file_URL: {
    type: String,
    required: true
  },
  uploaded_at: {
    type: Date,
    default: Date.now()
  }
});
payrollSchema.plugin(_mongooseUniqueValidator2.default, {
  message: 'Duplicate payroll for this employee'
});

const Payroll = exports.Payroll = _mongoose2.default.model('payroll', payrollSchema);