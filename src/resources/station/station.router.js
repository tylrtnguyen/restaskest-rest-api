import controllers from './station.controllers'
import { Router } from 'express'

const router = Router()

// /api/station
router
  .route('/')
  .get(controllers.getAllItems)
  .post(controllers.addItem)

// /api/station/:id
router
  .route('/:id')
  .get(controllers.getOneItem)
  .put(controllers.updateItem)
  .delete(controllers.removeItem)

export default router
      