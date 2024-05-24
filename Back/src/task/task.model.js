'use strict'

import { Schema, model } from 'mongoose'

const taskSchema = Schema({
    title: {
        type: String,
        required: [true, 'Title is required.']
    },
    description:{
        type: String
    },
    startDate:{
        type: Date,
        required: [true, 'Start date is required.']
    },
    endDate:{
        type: Date
    },
    status:{
        type: String,
        uppercase: true,
        default: 'DOING',
        enum: ['DOING', 'DONE', 'TO-DO']
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }
},{
    versionKey: false
});

export default model('Task', taskSchema);