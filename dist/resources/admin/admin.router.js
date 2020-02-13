"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _admin = require("./admin.controller");

const router = (0, _express.Router)(); // /api/manager

router.route('/').get(_admin.controllers.getAllItems).post(_admin.controllers.addItem); // /api/manager/:id

router.route('/:id').get(_admin.controllers.getOneItem).put(_admin.controllers.updateItem).delete(_admin.controllers.removeItem);
exports.default = router;