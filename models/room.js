import mongoose, { Schema } from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    created: {
      required: true,
      type: Date,
    },
    owner: { 
      required: true,
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    users: [
      { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
      },
    ]
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model('Room', roomSchema);

export default User;
