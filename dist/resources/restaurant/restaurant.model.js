"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Restaurant = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
let restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  pos: {
    type: String,
    required: true
  },
  managers: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Manager"
  }],
  employees: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Employee"
  }],
  inventory: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Inventory"
  }
});

const Restaurant = exports.Restaurant = _mongoose2.default.model('restaurant', restaurantSchema);