import mongoose from 'mongoose'

const Schema = mongoose.Schema

let materialSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    quantity: {
        type: Number,
        required: true
    },
    stockStatus: {
        type: String,
        required: true
    }
})

export const Material =  mongoose.model('material', materialSchema)