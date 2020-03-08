"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crudControllers = exports.removeItem = exports.updateItem = exports.addItem = exports.getAllItems = exports.getOneItem = undefined;

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get one item
const getOneItem = exports.getOneItem = model => async (req, res) => {
  let id = req.params.id;

  try {
    const item = await model.findById(id).lean().exec();

    if (!item) {
      res.status(400).json({
        success: false,
        message: "Couldn't find item"
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Get item successfully',
        data: item
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: 'Failed to fetch item'
    });
  }
}; // Get all item


const getAllItems = exports.getAllItems = model => async (req, res) => {
  try {
    const items = await model.find().lean().exec();

    if (!items) {
      res.status(400).end();
    }

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}; // add Item


const addItem = exports.addItem = model => async (req, res) => {
  try {
    // Implement the hashing and salting for Manager or Employee password
    if (req.body.password) {
      // Password modification section
      // 1. Salt and hash password
      // Salt
      const salt = await _bcrypt2.default.genSalt(10); // Hash

      const hashPassword = await _bcrypt2.default.hash(req.body.password, salt);
      req.body.password = hashPassword;
    } // Add that new item to the DB


    const item = await model.create(req.body);
    res.status(201).json({
      success: true,
      data: item
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
        message: 'Server Error'
      });
    }
  }
}; // Update item


const updateItem = exports.updateItem = model => async (req, res) => {
  try {
    const updatedItem = await model.findOneAndUpdate({
      _id: req.params.id
    }, req.body, // Add item to database if item does not exist
    {
      new: true
    }).lean().exec();

    if (!updatedItem) {
      return res.status(401).send("Not updated");
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updatedItem
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed to update item");
  }
}; // Remove item
// findOneAndRemove()


const removeItem = exports.removeItem = model => async (req, res) => {
  try {
    const removedItem = model.findOneAndRemove({
      _id: req.params.id
    }).exec();

    if (!removedItem) {
      res.status(400).json({
        success: false,
        message: "Couldn't delete item"
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully removed item"
    });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const crudControllers = exports.crudControllers = model => ({
  getOneItem: getOneItem(model),
  getAllItems: getAllItems(model),
  addItem: addItem(model),
  updateItem: updateItem(model),
  removeItem: removeItem(model)
});