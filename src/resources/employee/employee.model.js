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
        type: String,
        min: 8
    },
    wages:{
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
    date:{
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('employee', employeeSchema)