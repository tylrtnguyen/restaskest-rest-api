import { Router } from 'express'
import { controllers } from './manager.controller'

const router = Router()

// /api/manager
router
  .route('/')
  .get(controllers.getAllItems)
  .post(controllers.addItem)

// /api/manager/:id
router
  .route('/:id')
  .get(controllers.getOneItem)
  .put(controllers.updateItem)
  .delete(controllers.removeItem)

export default router