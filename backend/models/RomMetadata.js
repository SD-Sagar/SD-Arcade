import mongoose from 'mongoose';

const romMetadataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  romHash: {
    type: String,
    required: true,
  },
  gameTitle: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  lastPlayedAt: {
    type: Date,
    default: null,
  },
  playTime: {
    type: Number, // In seconds
    default: 0,
  },
  launchCount: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true, // handles uploadedAt
});

// Ensure a user only has one entry per romHash
romMetadataSchema.index({ userId: 1, romHash: 1 }, { unique: true });

const RomMetadata = mongoose.model('RomMetadata', romMetadataSchema);
export default RomMetadata;
