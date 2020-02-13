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
                type: Number
            },
            outHour: {
                type: Number
            }
        }
    ],
    employee: [employee]
})

export default mongoose.model('schedule', scheduleSchema)