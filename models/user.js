import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
      min: 2,
      max: 50,
    },
    email: {
      required: true,
      type: String,
      max: 50,
      unique: true,
    },
    password: {
      required: true,
      type: String,
      min: 5,
    },
    profilePic: {
      type: String,
      default:
        'https://t3.ftcdn.net/jpg/00/64/67/80/360_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg',
    },
    contacts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Room',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
