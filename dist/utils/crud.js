"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crudControllers = exports.getShiftByEmployeeId = exports.getAllShifts = exports.getAllEmployeesShiftByDate = exports.getOneEmployeesShiftByDate = exports.getAllWorkHours = exports.getEmployeeWorkHours = exports.removeItem = exports.updateItem = exports.addItem = exports.getAllItems = exports.getOneItem = undefined;

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _employeeWorkHour = require("./employeeWorkHour");

var _employee = require("../resources/employee/employee.model");

var _schedule = require("../resources/schedule/schedule.model");

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
        message: "Get item successfully",
        data: item
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: "Failed to fetch item"
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
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error"
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
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(val => val.message);
      console.log(err);
      return res.status(400).json({
        success: false,
        message: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Server Error"
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
    res.status(400).send("Failed to update item");
  }
}; // Remove item
// findOneAndRemove()


const removeItem = exports.removeItem = model => async (req, res) => {
  try {
    // @For employee removing only
    await _schedule.Schedule.findOneAndRemove({
      employee: req.params.id
    }).lean().exec(); // Remove Item

    const removedItem = model.findOneAndRemove({
      _id: req.params.id
    }).exec();

    if (!removedItem) {
      return res.status(400).json({
        success: false,
        message: "Couldn't delete item"
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully removed item"
    });
  } catch (e) {
    res.status(400).end();
  }
};

const getEmployeeWorkHours = exports.getEmployeeWorkHours = model => async (req, res) => {
  try {
    const workSchedule = await model.find({
      employee: req.params.id
    }).exec();

    if (!workSchedule) {
      return res.status(404).json({
        success: false,
        message: "No hours on this period"
      });
    }

    let start = req.params.start; // "2020-03-27T04:00:00.000Z"

    let stop = req.params.stop; // "2020-03-30T04:00:00.000Z"

    const totalWorkHours = (0, _employeeWorkHour.singleEmployeeWorkHourHelper)(start, stop, workSchedule);
    res.status(200).json({
      success: true,
      data: totalWorkHours
    });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const getAllWorkHours = exports.getAllWorkHours = model => async (req, res) => {
  try {
    const employeeList = await _employee.Employee.find().exec(); // Fetch employee id for filtering

    const employees = employeeList.map(employee => {
      return employee._id;
    });
    const workSchedule = await model.find({
      employee: {
        $in: employees
      }
    }).exec();

    if (!workSchedule) {
      return res.status(404).json({
        success: false,
        message: "No hours on this period"
      });
    }

    let start = req.params.start; // "2020-03-27T04:00:00.000Z"

    let stop = req.params.stop; // "2020-03-30T04:00:00.000Z"

    const workHourReport = await (0, _employeeWorkHour.allEmployeeWorkHourHelper)(start, stop, workSchedule);
    res.status(200).json({
      success: true,
      data: workHourReport
    });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
/* 
@endpoint: /api/schedule/:id/:date
@input: date, employee._id
@output: {
    employee,
    workHours (if workHours.date === date)
}
*/


const getOneEmployeesShiftByDate = exports.getOneEmployeesShiftByDate = model => async (req, res) => {
  try {
    const id = req.params.id;
    const date = req.params.date;
    const employeeShift = await model.find({
      employee: id
    }).exec();
    let allShifts = [];

    if (employeeShift) {
      for (const shift of employeeShift) {
        for (const workDay of shift.workDays) {
          // Convert workDate.date from type object to ISOString
          if (date === workDay.date.toISOString()) {
            allShifts.push(workDay);
          }
        }
      }

      res.status(200).json({
        success: true,
        data: allShifts
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No shift found"
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
/* 
@endpoint: /api/schedule/:date
@input: date
@output: {
    employee,
    workHours (if workHours.date === date)
}
*/


const getAllEmployeesShiftByDate = exports.getAllEmployeesShiftByDate = model => async (req, res) => {
  try {
    const date = req.params.date;
    const allShifts = await model.find().exec();
    let returnShift = [];

    for (const shift of allShifts) {
      for (const workDay of shift.workDays) {
        // Convert workDate.date from type object to ISOString
        if (date === workDay.date.toISOString()) {
          const foundEmployee = await _employee.Employee.findById(shift.employee).lean().exec();
          console.log(foundEmployee);
          returnShift.push({
            employeeID: shift.employee,
            employeeName: `${foundEmployee.fName} ${foundEmployee.lName}`,
            date: workDay.date,
            start: workDay.assignedStartHour,
            stop: workDay.assignedStopHour
          });
        }
      }
    }

    res.status(200).json({
      success: true,
      data: returnShift
    });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
/* 
@endpoint: /api/schedule/shift/all
@input: null
@output: [{
    scheduleId,
    employeeId,
    shiftId,
    date,
    employeeName,
    start,
    stop
}]
*/


const getAllShifts = exports.getAllShifts = model => async (req, res) => {
  try {
    const schedule = await model.find().lean().exec();
    let returnShift = [];

    for (const shift of schedule) {
      for (const workDay of shift.workDays) {
        const foundEmployee = await _employee.Employee.findById(shift.employee).lean().exec();
        returnShift.push({
          id: shift._id,
          shiftId: workDay._id,
          employeeId: shift.employee,
          employeeName: `${foundEmployee.fName} ${foundEmployee.lName}`,
          date: workDay.date,
          wages: foundEmployee.wages,
          start: workDay.assignedStartHour,
          stop: workDay.assignedStopHour
        });
      }
    }

    res.status(200).json({
      success: true,
      data: returnShift
    });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
/* 
@endpoint: /api/schedule/shift/:employee_id
@input: null
@output: [{
    employeeId,
    date,
    employeeName,
    start,
    stop
}]
*/


const getShiftByEmployeeId = exports.getShiftByEmployeeId = model => async (req, res) => {
  try {
    const schedule = await model.find({
      employee: req.params.id
    }).lean().exec();
    let returnShift = [];

    for (const shift of schedule) {
      for (const workDay of shift.workDays) {
        const foundEmployee = await _employee.Employee.findById(shift.employee).lean().exec();
        returnShift.push({
          employeeId: shift.employee,
          employeeName: `${foundEmployee.fName} ${foundEmployee.lName}`,
          date: workDay.date,
          wages: foundEmployee.wages,
          start: workDay.assignedStartHour,
          stop: workDay.assignedStopHour
        });
      }
    }

    res.status(200).json({
      success: true,
      data: returnShift
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
  removeItem: removeItem(model),
  getEmployeeWorkHours: getEmployeeWorkHours(model),
  getAllWorkHours: getAllWorkHours(model),
  getAllShifts: getAllShifts(model),
  getShiftByEmployeeId: getShiftByEmployeeId(model),
  getOneEmployeesShiftByDate: getOneEmployeesShiftByDate(model),
  getAllEmployeesShiftByDate: getAllEmployeesShiftByDate(model)
});