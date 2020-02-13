"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _user = require("./user.controllers");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // /api/user

router.route('/').get(_user2.default.getAllItems).post(_user2.default.addItem); // /api/user/:id

router.route('/:id').get(_user2.default.getOneItem).put(_user2.default.updateItem).delete(_user2.default.removeItem);
exports.default = router;