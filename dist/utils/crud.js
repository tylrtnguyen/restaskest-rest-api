"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crudControllers = exports.removeItem = exports.updateItem = exports.addItem = exports.getAllItems = exports.getOneItem = undefined;

var _auth = require("./auth");

// Get one item
const getOneItem = exports.getOneItem = model => async (req, res) => {
  let id = req.params.id;

  try {
    const item = await model.findById(id).lean().exec((error, item) => {
      if (error) {
        console.log(error);
        res.status(400).end();
      } else {
        res.status(200).json(item);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).send('Failed to fetch item');
  }
}; // Get all item


const getAllItems = exports.getAllItems = model => async (req, res) => {
  try {
    const items = await model.find().lean().exec((error, items) => {
      if (error) {
        console.log(error);
        res.status(400).end();
      } else {
        res.status(200).json(items);
      }
    });
  } catch (e) {
    res.status(400).send("Failed to fetch items");
  }
}; // add Item


const addItem = exports.addItem = model => async (req, res) => {
  let item_to_add;

  if (model === employee || model === admin) {
    await (0, _auth.register)();
  }

  try {
    const item = await item_to_add.save();
    res.status(201).json(item);
  } catch (e) {
    console.log(e);
    res.status(400).send("Failed to add new item");
  }
}; // Update item


const updateItem = exports.updateItem = model => async (req, res) => {
  try {
    // findOneAndUpdate(filter, update)
    const updatedItem = await model.findOneAndUpdate({
      _id: req.params.id
    }, req.body, {
      new: true
    }).lean().exec(item => {
      if (!item) {
        return next(new Error('Could not load document'));
      }
    });
    res.status(200).json(updatedItem);
  } catch (e) {
    console.log(e);
    res.status(400).send("Failed to upload item");
  }
}; // Remove item
// findOneAndRemove()


const removeItem = exports.removeItem = model => async (req, res) => {
  try {
    const removedItem = model.findOneAndRemove({
      _id: req.params.id
    });

    if (!removedItem) {
      res.status(400).send("Failed to remove item");
    }

    res.status(200).json(removedItem);
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