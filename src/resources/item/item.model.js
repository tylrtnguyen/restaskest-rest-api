import mongoose from 'mongoose'

const Schema = mongoose.Schema

let itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    materials: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Material"
    }]
})

export const Item = mongoose.model('item', itemSchema)