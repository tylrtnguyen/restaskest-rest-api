"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _manager = require("./manager.controller");

const router = (0, _express.Router)(); // /api/manager

router.route('/').get(_manager.controllers.getAllItems).post(_manager.controllers.addItem); // /api/manager/:id

router.route('/:id').get(_manager.controllers.getOneItem).put(_manager.controllers.updateItem).delete(_manager.controllers.removeItem);
exports.default = router;