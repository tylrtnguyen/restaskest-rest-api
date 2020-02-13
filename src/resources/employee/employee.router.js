import { Router } from 'express'
import { controllers } from './employee.controller'

const router = Router()

// /api/employee
router
  .route('/')
  .get(controllers.getAllItems)
  .post(controllers.addItem)

// /api/employee/:id
router
  .route('/:id')
  .get(controllers.getOneItem)
  .put(controllers.updateItem)
  .delete(controllers.removeItem)

export default router