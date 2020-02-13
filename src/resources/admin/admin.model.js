import mongoose from 'mongoose';

const Schema = mongoose.Schema

const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            min: 8
        },
        role: {
            type: String,
            required: true,
            min: 8
        },
        password: {
            type: String,
            required: true,
            min: 8
        }
    }
)

export default mongoose.model('admin', adminSchema)