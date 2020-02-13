"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _manager = require("../manager/manager.model");

var _manager2 = _interopRequireDefault(_manager);

var _inventory = require("../inventory/inventory.model");

var _inventory2 = _interopRequireDefault(_inventory);

var _employee = require("../employee/employee.model");

var _employee2 = _interopRequireDefault(_employee);

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
  phoneNumber: {
    type: String,
    required: true
  },
  managers: [_manager2.default],
  employees: [_employee2.default],
  inventory: [_inventory2.default]
});
exports.default = _mongoose2.default.model('restaurant', restaurantSchema);