import SaveState from '../models/SaveState.js';

// @desc    Save a state slot
// @route   POST /api/saves/:romHash/:slot
// @access  Private
export const uploadSave = async (req, res) => {
  try {
    const { romHash, slot } = req.params;
    const { saveData } = req.body; // Expecting Base64 string

    if (!saveData) {
      return res.status(400).json({ message: 'Save data is required' });
    }

    const saveSlotNum = parseInt(slot, 10);
    if (saveSlotNum < 1 || saveSlotNum > 3) {
      return res.status(400).json({ message: 'Invalid save slot. Must be 1, 2, or 3.' });
    }

    const filter = { userId: req.user._id, romHash, saveSlot: saveSlotNum };
    const update = { saveData };
    const options = { new: true, upsert: true };

    const savedState = await SaveState.findOneAndUpdate(filter, update, options);

    res.status(200).json({ message: 'Save successful', save: { slot: savedState.saveSlot, updatedAt: savedState.updatedAt } });
  } catch (error) {
    console.error('Upload Save Error:', error);
    res.status(500).json({ message: 'Server error saving state' });
  }
};

// @desc    Get all saves for a specific ROM
// @route   GET /api/saves/:romHash
// @access  Private
export const getSaves = async (req, res) => {
  try {
    const { romHash } = req.params;

    // Fetch without saveData to save bandwidth when just listing
    const saves = await SaveState.find({ userId: req.user._id, romHash })
      .select('-saveData')
      .sort({ saveSlot: 1 });

    res.status(200).json(saves);
  } catch (error) {
    console.error('Get Saves Error:', error);
    res.status(500).json({ message: 'Server error retrieving saves' });
  }
};

// @desc    Load a specific save slot
// @route   GET /api/saves/:romHash/:slot
// @access  Private
export const loadSave = async (req, res) => {
  try {
    const { romHash, slot } = req.params;
    const saveSlotNum = parseInt(slot, 10);

    const save = await SaveState.findOne({ userId: req.user._id, romHash, saveSlot: saveSlotNum });

    if (!save) {
      return res.status(404).json({ message: 'Save state not found' });
    }

    res.status(200).json({ saveData: save.saveData });
  } catch (error) {
    console.error('Load Save Error:', error);
    res.status(500).json({ message: 'Server error loading save' });
  }
};

// @desc    Delete a specific save slot
// @route   DELETE /api/saves/:romHash/:slot
// @access  Private
export const deleteSave = async (req, res) => {
  try {
    const { romHash, slot } = req.params;
    const saveSlotNum = parseInt(slot, 10);

    const save = await SaveState.findOneAndDelete({ userId: req.user._id, romHash, saveSlot: saveSlotNum });

    if (!save) {
      return res.status(404).json({ message: 'Save state not found' });
    }

    res.status(200).json({ message: 'Save state deleted successfully' });
  } catch (error) {
    console.error('Delete Save Error:', error);
    res.status(500).json({ message: 'Server error deleting save' });
  }
};
