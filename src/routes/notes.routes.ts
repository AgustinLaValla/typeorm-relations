import { Router } from 'express';
import { NotesController } from '../controller/NotesController';

const router = Router();

router.get('/', NotesController.getNotes)
router.post('/', NotesController.createNote);

export default router;