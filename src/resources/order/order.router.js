import controllers from './order.controllers'
import { Router } from 'express'

const router = Router()

// @route /api/order
router
  .route('/')
  .get(controllers.getAllItems)
  .post(controllers.addItem)

// @route /api/order/:id
router
  .route('/:id')
  .get(controllers.getOneItem)
  .put(controllers.updateItem)
  .delete(controllers.removeItem)

export default router