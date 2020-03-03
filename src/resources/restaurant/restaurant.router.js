import controllers from './restaurant.controllers'
import { Router } from 'express'

const router = Router()

// @route /api/restaurant
router
  .route('/')
  .get(controllers.getAllItems)
  .post(controllers.addItem)

// @route /api/restaurant/:id
router
  .route('/:id')
  .get(controllers.getOneItem)
  .put(controllers.updateItem)
  .delete(controllers.removeItem)

export default router