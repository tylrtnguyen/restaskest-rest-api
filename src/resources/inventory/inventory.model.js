import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    materials:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material"
      } ],
    lastUpdate: {
        type: Date,
        default: Date.now
    },
})

export const Inventory = mongoose.model('inventory', inventorySchema)