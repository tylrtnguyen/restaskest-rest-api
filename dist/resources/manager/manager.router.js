"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _manager = require("./manager.controllers");

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // @route /api/manager

router.route('/').get(_manager2.default.getAllItems).post(_manager2.default.addItem); // @route /api/manager/:id

router.route('/:id').get(_manager2.default.getOneItem).put(_manager2.default.updateItem).delete(_manager2.default.removeItem);
exports.default = router;