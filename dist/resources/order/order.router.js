"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _order = require("./order.controllers");

var _order2 = _interopRequireDefault(_order);

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // @route /api/order

router.route('/').get(_order2.default.getAllItems).post(_order2.default.addItem); // @route /api/order/:id

router.route('/:id').get(_order2.default.getOneItem).put(_order2.default.updateItem).delete(_order2.default.removeItem);
exports.default = router;