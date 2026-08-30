import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import {
  validateCreateNote,
  validateGetAllNotes,
  validateNoteId,
  validateUpdateNote,
} from '../validations/notesValidation.js';

const router = Router();

router.get('/notes', validateGetAllNotes, getAllNotes);
router.post('/notes', validateCreateNote, createNote);
router.get('/notes/:noteId', validateNoteId, getNoteById);
router.patch('/notes/:noteId', validateUpdateNote, updateNote);
router.delete('/notes/:noteId', validateNoteId, deleteNote);

export default router;
