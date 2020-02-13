"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _employee = require("./employee.controller");

const router = (0, _express.Router)(); // /api/employee

router.route('/').get(_employee.controllers.getAllItems).post(_employee.controllers.addItem); // /api/employee/:id

router.route('/:id').get(_employee.controllers.getOneItem).put(_employee.controllers.updateItem).delete(_employee.controllers.removeItem);
exports.default = router;