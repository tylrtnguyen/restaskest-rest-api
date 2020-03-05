import mongoose from 'mongoose'

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
    address:{
        type: String
    },
    DOB:{
        type: String
    },
    wages:{
        type:Number
    },
    JoinDate:{
        type: String,
        default: Date.now
    },
    email:{
        type: String,
        required: true,
        unique: [true, "Email is already taken"],
        max:255
    },
    password:{
        type: String,
        required: true,
        min: 8
    }
})

export const Employee = mongoose.model('employee', employeeSchema)