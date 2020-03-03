"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Station = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
let stationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  employees: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'Employee'
  }]
});

const Station = exports.Station = _mongoose2.default.model('station', stationSchema);