"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _payroll = require("./payroll.controllers");

var _multer = require("../../config/multer.config");

const router = (0, _express.Router)();
router.route('/upload').post(_multer.upload.single("file"), _payroll.uploadAndSave);
router.route('/all').get(_payroll.getAllPayroll);
router.route('/:id').delete(_payroll.deletePayroll).put(_payroll.updatePayroll);
router.route('/emp/:id').get(_payroll.findPayrollByEmpId);
exports.default = router;