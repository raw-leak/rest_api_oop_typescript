import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model('User', UserSchema);
