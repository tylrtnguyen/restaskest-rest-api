import mongoose from 'mongoose';

const Schema = mongoose.Schema

const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name cannot be blank"]
        },
        role: {
            type: String,
            required: [true, "Role is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            min: 8
        }
    }
)

export default mongoose.model('admin', adminSchema)