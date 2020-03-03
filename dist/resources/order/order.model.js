"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Order = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _item = require("../item/item.model");

var _employee = require("../employee/employee.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
let orderSchema = new Schema({
  items: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Item"
  }],
  employee: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Employee"
  }],
  numOfItem: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  }
});

const Order = exports.Order = _mongoose2.default.model('order', orderSchema);