import { Router } from 'express'
import controllers from './manager.controllers'

const router = Router()

// @route /api/manager
router
  .route('/')
  .get(controllers.getAllItems)
  .post(controllers.addItem)

// @route /api/manager/:id
router
  .route('/:id')
  .get(controllers.getOneItem)
  .put(controllers.updateItem)
  .delete(controllers.removeItem)

export default router