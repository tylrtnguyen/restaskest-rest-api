import mongoose from 'mongoose'

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
    pos: {
        type: String,
        required: true
    },
    managers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manager"
    }],
    employees:[  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }],
    inventory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory"
    }
})

export const Restaurant = mongoose.model('restaurant', restaurantSchema)