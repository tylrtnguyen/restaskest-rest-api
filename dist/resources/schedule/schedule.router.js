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

router.route('/:id').get(_schedule2.default.getOneItem).put(_schedule2.default.updateItem).delete(_schedule2.default.removeItem); // /api/schedule/workhours/:id/:start/:stop

router.route('/workhours/:id/:start/:stop').get(_schedule2.default.getEmployeeWorkHours); // /api/schedule/workhours/:start/:stop

router.route('/workhours/:start/:stop').get(_schedule2.default.getAllWorkHours); // /api/schedule/all

router.route('/shift/all').get(_schedule2.default.getAllShifts); // /api/schedule/:id

router.route('/shift/:id').get(_schedule2.default.getShiftByEmployeeId); // /api/schedule/:date

router.route('/all/:date').get(_schedule2.default.getAllEmployeesShiftByDate); // /api/schedule/:id/:date

router.route('/:id/:date').get(_schedule2.default.getOneEmployeesShiftByDate);
exports.default = router;