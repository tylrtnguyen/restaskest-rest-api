import { Router } from 'express'
import controllers from './employee.controllers'

const router = Router()

// @route: /api/employee
router
  .route('/')
      .get(controllers.getAllItems)
      .post(controllers.addItem)

// @route: /api/employee/:id
router
  .route('/:id')
  .get(controllers.getOneItem)
  .put(controllers.updateItem)
  .delete(controllers.removeItem)

export default router