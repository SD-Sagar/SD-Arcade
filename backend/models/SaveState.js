import mongoose from 'mongoose';

const saveStateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  romHash: {
    type: String,
    required: true,
  },
  saveSlot: {
    type: Number,
    required: true,
    default: 0,
  },
  saveData: {
    type: String, // Base64 encoded or binary payload for the save file
    required: true,
  }
}, {
  timestamps: true,
});

saveStateSchema.index({ userId: 1, romHash: 1, saveSlot: 1 }, { unique: true });

const SaveState = mongoose.model('SaveState', saveStateSchema);
export default SaveState;
