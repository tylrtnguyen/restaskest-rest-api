import mongoose from 'mongoose'
import { item } from '../item/item.model'
import { employee } from '../employee/employee.model'

const Schema = mongoose.Schema

let orderSchema = new Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }],
    employee: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }],
    numOfItem: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    }
})

export const Order = mongoose.model('order', orderSchema)