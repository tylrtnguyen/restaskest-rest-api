import mongoose from 'mongoose'
import moment from 'moment'
import uniqueValidator from 'mongoose-unique-validator'

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
        type: String,
        default: moment().format('ll')
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

managerSchema.plugin(uniqueValidator, { message: 'Email is already taken'})

export const Manager = mongoose.model('manager', managerSchema)