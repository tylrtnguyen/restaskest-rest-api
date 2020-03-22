import controllers from './schedule.controllers'
import { Router } from 'express'

const router = Router()

// /api/schedule
router
  .route('/')
  .get(controllers.getAllItems)
  .post(controllers.addItem)

// /api/schedule/:id
router
  .route('/:id')
  .get(controllers.getOneItem)
  .put(controllers.updateItem)
  .delete(controllers.removeItem)

// /api/schedule/workhours/:id/:start/:stop
router.route('/workhours/:id/:start/:stop')
      .get(controllers.getEmployeeWorkHours)

// /api/schedule/workhours/:start/:stop
router.route('/workhours/:start/:stop')
      .get(controllers.getAllWorkHours)

// /api/schedule/all
router.route('/shift/all')
      .get(controllers.getAllShifts)

// /api/schedule/:id
router.route('/shift/:id')
      .get(controllers.getShiftByEmployeeId)

// /api/schedule/:date
router.route('/all/:date')
      .get(controllers.getAllEmployeesShiftByDate)

// /api/schedule/:id/:date
router.route('/:id/:date')
      .get(controllers.getOneEmployeesShiftByDate)


      
export default router
      