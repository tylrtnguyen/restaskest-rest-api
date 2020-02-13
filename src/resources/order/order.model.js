import mongoose from 'mongoose'
import { item } from '../item/item.model'
import { employee } from '../employee/employee.model'

const Schema = mongoose.Schema

let orderSchema = new Schema({
    items: [item],
    employee: [employee],
    numOfItem: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    }
})

export default mongoose.model('order', orderSchema)