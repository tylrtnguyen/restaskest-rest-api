import mongoose from 'mongoose'
import {  materialSchema } from '../material/material.model'

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    materials:[ materialSchema ],
    lastUpdate: {
        type: Date,
        default: Date.now
    },
})