"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _employee = require("../employee/employee.model");

var _employee2 = _interopRequireDefault(_employee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
let stationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  employees: [_employee2.default]
});
exports.default = _mongoose2.default.model('station', stationSchema);