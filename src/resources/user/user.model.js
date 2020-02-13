import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            max: 255
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 8
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }
)

export const User = mongoose.model('user', userSchema)