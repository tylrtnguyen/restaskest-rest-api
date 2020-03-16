import mongoose from 'mongoose'
import employee from '../employee/employee.model'

const Schema = mongoose.Schema

let scheduleSchema = new Schema({
    workDays: [
        {
            date:{
                type: Date,
                required: true
            },
            assignedStartHour: {
                type: Number,
                required: true
            },
            assignedStopHour: {
                type: Number,
                required: true
            },
            inHour: {
                type: Number
            },
            outHour: {
                type: Number
            }
        }
    ],
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    }
})

export const Schedule = mongoose.model('schedule', scheduleSchema)