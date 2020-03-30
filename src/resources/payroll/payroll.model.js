import mongoose, { model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema;

const payrollSchema = new Schema({
    employee_id:{
        type: String,
        unique: true
    },
    file_title: {
        type: String,
        required: true
    },
    file_URL: {
        type: String,
        required: true
    },
    uploaded_at: {
        type: Date,
        default: Date.now()
    }
})

payrollSchema.plugin(uniqueValidator, { message: 'Duplicate payroll for this employee' })

export const Payroll = mongoose.model('payroll', payrollSchema) 