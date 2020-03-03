"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _restaurant = require("./restaurant.controllers");

var _restaurant2 = _interopRequireDefault(_restaurant);

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // @route /api/restaurant

router.route('/').get(_restaurant2.default.getAllItems).post(_restaurant2.default.addItem); // @route /api/restaurant/:id

router.route('/:id').get(_restaurant2.default.getOneItem).put(_restaurant2.default.updateItem).delete(_restaurant2.default.removeItem);
exports.default = router;