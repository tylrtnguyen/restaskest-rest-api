import controllers from './inventory.controllers'
import { Router } from 'express'

const router = Router()


// @route: /api/inventory
router.route('/')
     .get(controllers.getAllItems)
     .post(controllers.addItem)


// @route: /api/inventory/:id
router.route('/:id')
     .get(controllers.getOneItem)
     .put(controllers.updateItem)
     .delete(controllers.removeItem)

export default router

