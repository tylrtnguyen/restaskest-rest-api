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

// /api/schedule/workhours/:id
router.route('/workhours/:id/:start/:stop')
      .get(controllers.getEmployeeWorkHours)

export default router
      