import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  id: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
    select: false,
  },
});

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.id = this._id.toString();
  }
  next();
});

export const User = mongoose.model('User', UserSchema);
