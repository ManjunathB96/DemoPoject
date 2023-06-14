import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    fullName: {
      type: String
    },
    age: {
      type: Number
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    refreshToken:{
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);
