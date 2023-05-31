import mongoose, { Schema } from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    created: {
      required: true,
      type: String,
      min: 2,
      max: 50,
    },
    from: { 
      required: true,
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    to:  { 
      required: true,
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    content: {
      type: String,
      required: true,
      min: 1,
      max: 100
    }
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
