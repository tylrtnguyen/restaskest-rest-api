import controllers from './item.controllers'
import { Router } from 'express'

const router = Router()


// @route   /api/item
router.route('/')
     .get(controllers.getAllItems)
     .post(controllers.addItem)

// @route   /api/item/:id
router.route('/:id')
     .get(controllers.getOneItem)
     .put(controllers.updateItem)
     .delete(controllers.removeItem)

export default router

