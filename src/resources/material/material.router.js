import controllers from './material.controllers'
import { Router } from 'express'

const router = Router()

// @route /api/material
router
  .route('/')
  .get(controllers.getAllItems)
  .post(controllers.addItem)

// @route /api/material/:id
router
  .route('/:id')
  .get(controllers.getOneItem)
  .put(controllers.updateItem)
  .delete(controllers.removeItem)

export default router