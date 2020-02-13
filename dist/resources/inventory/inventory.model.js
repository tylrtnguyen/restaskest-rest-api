"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _material = require("../material/material.model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
const inventorySchema = new Schema({
  materials: [_material.materialSchema],
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});