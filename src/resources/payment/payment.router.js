import controllers from './payment.controllers'
import { Router } from 'express'

const router = Router()

// @route /api/payment
router
  .route('/')
  .get(controllers.getAllItems)
  .post(controllers.saveStripeRecord)

// @route /api/payment/:id
router
  .route('/:id')
  .get(controllers.getOneItem)
  .put(controllers.updateItem)
  .delete(controllers.removeItem)

export default router