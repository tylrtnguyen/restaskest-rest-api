"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _item = require("./item.controllers");

var _item2 = _interopRequireDefault(_item);

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // @route   /api/item

router.route('/').get(_item2.default.getAllItems).post(_item2.default.addItem); // @route   /api/item/:id

router.route('/:id').get(_item2.default.getOneItem).put(_item2.default.updateItem).delete(_item2.default.removeItem);
exports.default = router;