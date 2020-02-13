"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _item = require("../item/item.model");

var _employee = require("../employee/employee.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
let orderSchema = new Schema({
  items: [_item.item],
  employee: [_employee.employee],
  numOfItem: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  }
});
exports.default = _mongoose2.default.model('order', orderSchema);