"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _station = require("./station.controllers");

var _station2 = _interopRequireDefault(_station);

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // /api/station

router.route('/').get(_station2.default.getAllItems).post(_station2.default.addItem); // /api/station/:id

router.route('/:id').get(_station2.default.getOneItem).put(_station2.default.updateItem).delete(_station2.default.removeItem);
exports.default = router;