"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.employeeLogin = exports.managerLogin = exports.login = exports.register = exports.newToken = undefined;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

var _user = require("../resources/user/user.model");

var _manager = require("../resources/manager/manager.model");

var _employee = require("../resources/employee/employee.model");

var _restaurant = require("../resources/restaurant/restaurant.model");

var _validation = require("./validation");

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

const newToken = exports.newToken = user => {
  return _jsonwebtoken2.default.sign({
    id: user._id
  }, process.env.TOKEN, {
    expiresIn: '1h'
  });
};

const register = exports.register = async (req, res) => {
  // Pass user input to validate with Joi
  const {
    error
  } = (0, _validation.registerValidation)(req.body); // If error

  if (error) {
    console.log(error);
    return res.status(400).send(error.details[0]);
  } // Password modification section
  // 1. Salt and hash password
  // Salt


  const salt = await _bcrypt2.default.genSalt(10); // Hash

  const hashPassword = await _bcrypt2.default.hash(req.body.password, salt); // Creating new user

  try {
    const newRestaurant = new _restaurant.Restaurant({
      name: req.body.restaurantName,
      address: req.body.restaurantAddress,
      pos: req.body.pos
    });
    const savedRestaurant = await _restaurant.Restaurant.create(newRestaurant);

    if (!savedRestaurant) {
      return res.status(400).json({
        success: false,
        message: "Failed to create restaurant"
      });
    }

    const newManager = new _manager.Manager({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      password: hashPassword,
      restaurants: savedRestaurant._id
    });
    const savedManager = await _manager.Manager.create(newManager);
    res.status(201).json({
      success: true,
      data: savedManager
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      console.log(err);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      console.log(err);
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}; // Login 


const login = exports.login = async (req, res) => {
  const {
    error
  } = (0, _validation.loginValidation)(req.body);

  if (error) {
    return res.status(400).send(error.details[0]);
  } // Check if the user exists using email


  const userData = req.body;
  const user = await _user.User.findOne({
    email: userData.email
  }).select('email password').exec();

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Email or password is invalid"
    });
  } // Check if the password correct


  const passwordCorrect = await _bcrypt2.default.compare(userData.password, user.password);

  if (!passwordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Email or password is invalid"
    });
  }

  const token = newToken(user);
  res.status(200).json({
    token: token,
    userId: user._id,
    role: 'admin'
  });
}; // Manager Login 


const managerLogin = exports.managerLogin = async (req, res) => {
  const {
    error
  } = (0, _validation.loginValidation)(req.body);

  if (error) {
    return res.status(400).send(error.details[0]);
  } // Check if the user exists using email


  const managerData = req.body;
  const manager = await _manager.Manager.findOne({
    email: managerData.email
  }).select('email password').exec();

  if (!manager) {
    return res.status(401).json({
      success: false,
      message: "Email or password is invalid"
    });
  } // Check if the password correct


  const passwordCorrect = await _bcrypt2.default.compare(managerData.password, manager.password);

  if (!passwordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Email or password is invalid"
    });
  }

  const token = newToken(manager);
  res.status(200).json({
    token: token,
    expiresIn: '3600',
    userId: manager._id,
    role: 'manager'
  });
}; // Employee Login 


const employeeLogin = exports.employeeLogin = async (req, res) => {
  const {
    error
  } = (0, _validation.loginValidation)(req.body);

  if (error) {
    return res.status(400).send(error.details[0]);
  } // Check if the user exists using email


  const employeeData = req.body;
  const employee = await _employee.Employee.findOne({
    email: employeeData.email
  }).select('email password').exec();

  if (!employee) {
    return res.status(401).json({
      success: false,
      message: "Email or password is invalid"
    });
  } // Check if the password correct


  const passwordCorrect = await _bcrypt2.default.compare(employeeData.password, employee.password);

  if (!passwordCorrect) {
    return res.status(401).json({
      success: false,
      message: "Email or password is invalid"
    });
  }

  const token = newToken(employee);
  res.status(200).json({
    token: token,
    expiresIn: '3600',
    userId: employee._id,
    role: 'employee'
  });
};

const protect = exports.protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }

  const token = bearer.split("Bearer ")[1].trim();

  try {
    const decodedToken = _jsonwebtoken2.default.verify(token, process.env.TOKEN);

    req.user = {
      id: decodedToken.id
    };
    next();
  } catch (e) {
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: e.message
      });
    }

    res.status(500).end();
  }
};