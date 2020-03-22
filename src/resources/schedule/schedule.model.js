import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'


const Schema = mongoose.Schema

let scheduleSchema = new Schema({
    workDays: [
        {
            date:{
                type: Date,
                required: true,
                unique: true
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

scheduleSchema.plugin(uniqueValidator, { message: 'Duplicate shift for this employee' })

export const Schedule = mongoose.model('schedule', scheduleSchema)