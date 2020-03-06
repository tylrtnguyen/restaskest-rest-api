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

var _schedule = require("./resources/schedule/schedule.router");

var _schedule2 = _interopRequireDefault(_schedule);

var _inventory = require("./resources/inventory/inventory.router");

var _inventory2 = _interopRequireDefault(_inventory);

var _order = require("./resources/order/order.router");

var _order2 = _interopRequireDefault(_order);

var _employee = require("./resources/employee/employee.router");

var _employee2 = _interopRequireDefault(_employee);

var _item = require("./resources/item/item.router");

var _item2 = _interopRequireDefault(_item);

var _restaurant = require("./resources/restaurant/restaurant.router");

var _restaurant2 = _interopRequireDefault(_restaurant);

var _manager = require("./resources/manager/manager.router");

var _manager2 = _interopRequireDefault(_manager);

var _material = require("./resources/material/material.router");

var _material2 = _interopRequireDefault(_material);

var _payment = require("./resources/payment/payment.router");

var _payment2 = _interopRequireDefault(_payment);

var _station = require("./resources/station/station.router");

var _station2 = _interopRequireDefault(_station);

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
// Register route is the private used to 
// add new Admin Account in to the app

app.post('/register', _auth.register);
app.post('/login', _auth.login);
app.post('/login/manager', _auth.managerLogin);
app.post('/login/employee', _auth.employeeLogin); // API Routes

app.use('/api', _auth.protect);
app.use('/api/user', _user2.default);
app.use('/api/inventory', _inventory2.default);
app.use('/api/schedule', _schedule2.default);
app.use('/api/order', _order2.default);
app.use('/api/employee', _employee2.default);
app.use('/api/item', _item2.default);
app.use('/api/manager', _manager2.default);
app.use('/api/material', _material2.default);
app.use('/api/payment', _payment2.default);
app.use('/api/restaurant', _restaurant2.default);
app.use('/api/station', _station2.default);

const start = exports.start = async () => {
  try {
    await (0, _db.connect)();
    app.listen(port, () => {
      console.log(`REST API on http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();