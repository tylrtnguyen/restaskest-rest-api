"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inventory = require("./inventory.controllers");

var _inventory2 = _interopRequireDefault(_inventory);

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // @route: /api/inventory

router.route('/').get(_inventory2.default.getAllItems).post(_inventory2.default.addItem); // @route: /api/inventory/:id

router.route('/:id').get(_inventory2.default.getOneItem).put(_inventory2.default.updateItem).delete(_inventory2.default.removeItem);
exports.default = router;