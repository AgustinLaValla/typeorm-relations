import { Request, Response } from "express";
import { SharedNote } from "../entity/SharedNote";
import { returnServerError } from '../utils/utils';

export class SharedNoteController {
    static shareNote = async (req: Request, res: Response) => {
        const { senderId, targetId, noteId } = req.params;

        try {
            const note = await SharedNote.create({
                targetId: parseInt(targetId),
                senderId: parseInt(senderId),
                noteId: parseInt(noteId)
            });

            await SharedNote.save(note);

            return res.json({ ok: true, message: 'Note successfully shared', note });

        } catch (error) {
            return returnServerError(res, error);
        }

    }

    static getNotesSharedWithUser = async (req: Request, res: Response) => {
        const { targetId } = req.params;
        try {
            return res.json({
                ok: true, notes: await SharedNote.find({
                    where: { targetId },
                    relations: ["note"]
                })
            });
        } catch (error) {
            return returnServerError(res, error);
        }
    }
}

