"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _payment = require("./payment.controllers");

var _payment2 = _interopRequireDefault(_payment);

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // @route /api/payment

router.route('/').get(_payment2.default.getAllItems).post(_payment2.default.addItem); // @route /api/payment/:id

router.route('/:id').get(_payment2.default.getOneItem).put(_payment2.default.updateItem).delete(_payment2.default.removeItem);
exports.default = router;