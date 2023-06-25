import mongoose, { Schema } from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
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

export default Room;
