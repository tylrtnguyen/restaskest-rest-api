"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upload = undefined;

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storage = _multer2.default.memoryStorage();

const upload = exports.upload = (0, _multer2.default)({
  storage: storage
});