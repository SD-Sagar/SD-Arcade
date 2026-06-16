import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { uploadSave, getSaves, loadSave, deleteSave } from '../controllers/saveController.js';

const router = express.Router();

router.route('/:romHash')
  .get(protect, getSaves);

router.route('/:romHash/:slot')
  .get(protect, loadSave)
  .post(protect, uploadSave)
  .delete(protect, deleteSave);

export default router;
