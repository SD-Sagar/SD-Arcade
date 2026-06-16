import express from 'express';
import { syncRomMetadata, getUserRoms, updatePlayStats, removeRomMetadata } from '../controllers/romController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect); // All ROM routes require authentication

router.route('/')
  .post(syncRomMetadata)
  .get(getUserRoms);

router.route('/:romHash')
  .delete(removeRomMetadata);

router.route('/:romHash/play')
  .put(updatePlayStats);

export default router;
