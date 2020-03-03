"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crud = require("../../utils/crud");

var _order = require("./order.model");

exports.default = (0, _crud.crudControllers)(_order.Order);