"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allEmployeeWorkHourHelper = exports.singleEmployeeWorkHourHelper = undefined;

var _employee = require("../resources/employee/employee.model");

var _schedule = require("../resources/schedule/schedule.model");

// Already have the schedule list
// workSchedule = [workDays]
// workDays = [{}]

/*
@input: startDate, stopDate, correspondingWorkSchedule
@output: totalWorkHours
*/
const singleEmployeeWorkHourHelper = exports.singleEmployeeWorkHourHelper = (start, stop, workSchedule) => {
  let totalWorkHours = 0;
  let from = new Date(start).getTime();
  let to = new Date(stop).getTime();

  for (const schedule of workSchedule) {
    for (const workDay of schedule.workDays) {
      const checkDate = workDay.date.getTime();

      if (checkDate >= from && checkDate <= to) {
        let workHours = workDay.assignedStopHour - workDay.assignedStartHour;
        totalWorkHours += workHours;
      }
    }
  }

  return totalWorkHours;
};
/*
@input: startDate, stopDate, correspondingWorkSchedule
@output: { 
            employee_id, 
            totalWorkHours
        }
*/


const allEmployeeWorkHourHelper = exports.allEmployeeWorkHourHelper = async (start, stop, workSchedule) => {
  let from = new Date(start).getTime();
  let to = new Date(stop).getTime();
  let employeeAndWorkHours = [];

  for (const schedule of workSchedule) {
    // Initial totalWorkHour for a single employee
    let totalWorkHours = 0;

    for (const workDay of schedule.workDays) {
      const checkDate = workDay.date.getTime();

      if (checkDate >= from && checkDate <= to) {
        let workHours = workDay.assignedStopHour - workDay.assignedStartHour;
        totalWorkHours += workHours;
      }
    }

    const employee = await _employee.Employee.findById(schedule.employee).exec();
    let workHourReport = {
      employeeID: schedule.employee,
      employeeName: `${employee.fName} ${employee.lName}`,
      employeeWages: employee.wages,
      totalWorkHours: totalWorkHours
    };
    employeeAndWorkHours.push(workHourReport);
  }

  return employeeAndWorkHours;
};