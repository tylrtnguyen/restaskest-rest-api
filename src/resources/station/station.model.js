import mongoose from 'mongoose'
import employee from '../employee/employee.model'

const Schema = mongoose.Schema

let stationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    employees: [employee]
})

export default mongoose.model('station', stationSchema)