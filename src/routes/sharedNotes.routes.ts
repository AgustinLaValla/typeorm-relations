import { Router } from 'express';
import { SharedNoteController }  from '../controller/SharedNoteController';

const router = Router();

router.get('/:targetId', SharedNoteController.getNotesSharedWithUser)
router.post('/:senderId/:targetId/:noteId', SharedNoteController.shareNote)

export default router;