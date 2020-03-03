"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _material = require("./material.controllers");

var _material2 = _interopRequireDefault(_material);

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // @route /api/material

router.route('/').get(_material2.default.getAllItems).post(_material2.default.addItem); // @route /api/material/:id

router.route('/:id').get(_material2.default.getOneItem).put(_material2.default.updateItem).delete(_material2.default.removeItem);
exports.default = router;