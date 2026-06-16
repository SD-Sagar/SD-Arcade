import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  romHash: {
    type: String,
    required: true,
  },
  joinCode: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['waiting', 'playing', 'closed'],
    default: 'waiting',
  }
}, {
  timestamps: true,
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
