"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = undefined;

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config(); // Add useNewUrlParser and UnifiedTopolgy to prevent warning


const connect = exports.connect = (url = process.env.DB_CONNECTION, opts = {}) => {
  _mongoose2.default.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  const connection = _mongoose2.default.connection;

  _mongoose2.default.set('useFindAndModify', false);

  connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });
};