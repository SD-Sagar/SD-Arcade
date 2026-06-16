import RomMetadata from '../models/RomMetadata.js';
import User from '../models/User.js';

// @desc    Add or update ROM metadata
// @route   POST /api/roms
// @access  Private
export const syncRomMetadata = async (req, res, next) => {
  try {
    const { romHash, gameTitle, platform } = req.body;

    let metadata = await RomMetadata.findOne({ userId: req.user._id, romHash });

    if (metadata) {
      // Update existing
      metadata.gameTitle = gameTitle || metadata.gameTitle;
      metadata.platform = platform || metadata.platform;
      await metadata.save();
    } else {
      // Create new
      metadata = await RomMetadata.create({
        userId: req.user._id,
        romHash,
        gameTitle,
        platform
      });
    }

    res.status(200).json(metadata);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all user ROM metadata
// @route   GET /api/roms
// @access  Private
export const getUserRoms = async (req, res, next) => {
  try {
    const roms = await RomMetadata.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(roms);
  } catch (error) {
    next(error);
  }
};

// @desc    Update play statistics
// @route   PUT /api/roms/:romHash/play
// @access  Private
export const updatePlayStats = async (req, res, next) => {
  try {
    const { romHash } = req.params;
    const { playTime } = req.body; // Additional playtime in seconds

    const metadata = await RomMetadata.findOne({ userId: req.user._id, romHash });

    if (!metadata) {
      res.status(404);
      throw new Error('ROM metadata not found');
    }

    metadata.lastPlayedAt = Date.now();
    metadata.launchCount = (metadata.launchCount || 0) + 1;
    if (playTime) {
      metadata.playTime = (metadata.playTime || 0) + playTime;
    }
    
    await metadata.save();

    // Update user's last played rom
    const user = await User.findById(req.user._id);
    user.lastPlayedRomHash = romHash;
    await user.save();

    res.status(200).json(metadata);
  } catch (error) {
    next(error);
  }
};

// @desc    Remove ROM metadata
// @route   DELETE /api/roms/:romHash
// @access  Private
export const removeRomMetadata = async (req, res, next) => {
  try {
    const { romHash } = req.params;
    const metadata = await RomMetadata.findOneAndDelete({ userId: req.user._id, romHash });

    if (!metadata) {
      res.status(404);
      throw new Error('ROM metadata not found');
    }

    res.status(200).json({ message: 'ROM metadata removed' });
  } catch (error) {
    next(error);
  }
};
