import mongoose from 'mongoose'
import { Restaurant } from '../restaurant/restaurant.model'

const Schema = mongoose.Schema

const managerSchema = new Schema({
    fName:{
        type: String,
        required: true,
        max: 255
    },
    lName:{
        type: String,
        required: true,
        max: 255
    },
    address:{
        type: String
    },
    DOB:{
        type: String,
        min: 8
    },
    salary:{
        type:Number
    },
    JoinDate:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique:true,
        max:255
    },
    password:{
        type: String,
        required: true
    },
    restaurants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Restaurant"
    }],
    date:{
        type: Date,
        default: Date.now
    }
})

export const Manager = mongoose.model('manager', managerSchema)