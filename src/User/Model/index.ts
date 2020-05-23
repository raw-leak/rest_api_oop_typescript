import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a first name'
    },
    email: {
        type: String,
        required: 'Enter a email'
    },
    password: {
        type: String,
        required: 'Enter a password'
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model('User', UserSchema);
