"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _employee = require("./employee.controllers");

var _employee2 = _interopRequireDefault(_employee);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // @route: /api/employee

router.route('/').get(_employee2.default.getAllItems).post(_employee2.default.addItem); // @route: /api/employee/:id

router.route('/:id').get(_employee2.default.getOneItem).put(_employee2.default.updateItem).delete(_employee2.default.removeItem);
exports.default = router;