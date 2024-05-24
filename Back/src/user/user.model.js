'use strict'

import {Schema, model} from 'mongoose';

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    surname: {
        type: String,
        required: [true, 'Surname is required.']
    },
    username: {
        type: String,
        unique: [true, 'Username must be unique.'],
        lowercase: true,
        required: [true, 'Username is required.']
    },
    password: {
        type: String,
        minLength: [8, 'Password min must be 8 characters.'],
        required: [true, 'Password is required.']
    },
    email: {
        type: String,
        unique: [true, 'Email must be unique'],
        required: [true, 'Email is required.']
    },
    status:{
        type: Boolean,
        default: true,
        required: [true, 'Status is required']
    }
},
{
    versionKey: false
});

//exportar el modelo.

export default model('User', userSchema);