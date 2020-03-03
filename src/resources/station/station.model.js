import mongoose from 'mongoose'

const Schema = mongoose.Schema

let stationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    employees: 
    [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Employee'
        }
    ]
})

export const Station = mongoose.model('station', stationSchema)