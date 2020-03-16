"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _schedule = require("./schedule.controllers");

var _schedule2 = _interopRequireDefault(_schedule);

var _express = require("express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // /api/schedule

router.route('/').get(_schedule2.default.getAllItems).post(_schedule2.default.addItem); // /api/schedule/:id

router.route('/:id').get(_schedule2.default.getOneItem).put(_schedule2.default.updateItem).delete(_schedule2.default.removeItem); // /api/schedule/workhours/:id

router.route('/workhours/:id/:start/:stop').get(_schedule2.default.getEmployeeWorkHours);
exports.default = router;