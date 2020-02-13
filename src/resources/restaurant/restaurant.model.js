import mongoose from 'mongoose'
import manager from '../manager/manager.model'
import inventory from '../inventory/inventory.model'
import employee from '../employee/employee.model'

const Schema = mongoose.Schema

let restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    managers:[ manager ],
    employees:[ employee ],
    inventory: [ inventory ]
})

export default mongoose.model('restaurant', restaurantSchema)