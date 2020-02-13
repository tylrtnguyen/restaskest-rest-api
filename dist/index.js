"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = undefined;

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _auth = require("./utils/auth");

var _db = require("./utils/db");

var _user = require("./resources/user/user.router");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// jshint: es6
const app = (0, _express2.default)();

_dotenv2.default.config();

const port = process.env.PORT || 5000;
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
  extended: true
}));
app.use((0, _cors2.default)());
app.use(_express2.default.static(__dirname + "/public"));
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
}); // Authentication routes

app.post('/register', _auth.register);
app.post('/login', _auth.login); // API Routes

app.use('/api', _auth.protect);
app.use('/api/user', _user2.default);

const start = exports.start = async () => {
  try {
    await (0, _db.connect)();
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();