import mongoose from 'mongoose'
import { material} from '../material/material.model'

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
    materials: [ material ]
})

export default mongoose.model('item', itemSchema)