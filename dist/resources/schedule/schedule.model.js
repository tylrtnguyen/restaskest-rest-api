"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Schedule = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _employee = require("../employee/employee.model");

var _employee2 = _interopRequireDefault(_employee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
let scheduleSchema = new Schema({
  workDays: [{
    date: {
      type: Date,
      required: true
    },
    assignedStartHour: {
      type: Number,
      required: true
    },
    assignedStopHour: {
      type: Number,
      required: true
    },
    inHour: {
      type: Number
    },
    outHour: {
      type: Number
    }
  }],
  employee: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'Employee'
  }
});

const Schedule = exports.Schedule = _mongoose2.default.model('schedule', scheduleSchema);