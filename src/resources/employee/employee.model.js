import mongoose from 'mongoose'
import moment from 'moment'
import uniqueValidator from 'mongoose-unique-validator'


const Schema = mongoose.Schema

const employeeSchema = new Schema({
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
    gender: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    address:{
        type: String
    },
    DOB:{
        type: String
    },
    isPermanent: {
        type: Boolean
    },
    wages:{
        type:Number
    },
    JoinDate:{
        type: String,
        default: moment().format('ll')
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max:255
    },
    password:{
        type: String,
        required: true,
        min: 8
    }
})

employeeSchema.plugin(uniqueValidator, { message: 'Email is already taken' })

export const Employee = mongoose.model('employee', employeeSchema)