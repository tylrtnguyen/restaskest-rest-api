import mongoose from 'mongoose'

const Schema = mongoose.Schema

let paymentSchema = new Schema({
    stripe_id: {
        type: String,
        required: true
    },
    object_type: {
        type: String,
        required: true
    },
    amount:{
        type:Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    failure_message: {
        type: String
    },
    billing_details: {
        type: Object,
        required: true
    },
    paid: {
        type: Boolean,
        required: true
    }
})

export const Payment = mongoose.model('payment', paymentSchema)