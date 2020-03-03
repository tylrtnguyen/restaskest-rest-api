"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Inventory = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
const inventorySchema = new Schema({
  materials: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "Material"
  }],
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});

const Inventory = exports.Inventory = _mongoose2.default.model('inventory', inventorySchema);