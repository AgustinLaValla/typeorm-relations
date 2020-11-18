import { Request, Response } from "express";
import { Note } from "../entity/Note";
import { returnServerError } from '../utils/utils';

export class NotesController {

    static createNote = async (req: Request, res: Response) => {
        const { ownerId, text } = req.body;
        try {
            const note = await Note.create({ ownerId, text });
            await Note.save(note);
            return res.json({ ok: true, message: 'Note Succesfully Created', note });
        } catch (error) {
            return returnServerError(res, error);
        }
    }

    static getNotes = async (req: Request, res: Response) => {
        const { ownerId } = req.params;
        try {
            return res.json({ ok: true, note: await Note.find({ where: { id: ownerId } }) });

        } catch (error) {
            returnServerError(res, error);
        }
    }
}