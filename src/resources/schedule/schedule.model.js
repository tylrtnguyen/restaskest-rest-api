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
                type: String,
                required: true
            },
            assignedStopHour: {
                type: String,
                required: true
            },
            inHour: {
                type: Number,
                required: true
            },
            outHour: {
                type: Number,
                required: true
            }
        }
    ],
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Employee'
    }
})

export const Schedule = mongoose.model('schedule', scheduleSchema)