"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _employee = require("./employee.model");

var _crud = require("../../utils/crud");

exports.default = (0, _crud.crudControllers)(_employee.Employee);