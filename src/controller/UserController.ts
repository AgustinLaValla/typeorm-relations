import { Request, Response } from "express";
import { User } from "../entity/User";
import { returnServerError } from '../utils/utils';

const getUser = async (id: string) => {
    return await User.findOne({
        where: { id },
        relations: [
            "notesSharedWithYou",
            "notesSharedWithYou.note",
            "notesSharedWithYou.sender",
            "notesYouShared",
            "notesYouShared.note",
            "notesYouShared.target"
        ]
    });
}

export class UserController {

    static getUsers = async (req: Request, res: Response) => {
        const users = await User.find({
            relations: [
                "notesSharedWithYou",
                "notesSharedWithYou.note",
                "notesSharedWithYou.sender",
                "notesYouShared",
                "notesYouShared.note",
                "notesYouShared.target"
            ]
        });
        try {
            return res.json({ ok: true, users });
        } catch (error) {
            return returnServerError(res, error);
        }
    }

    static getUserById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await getUser(id);
            if (!user) return res.status(400).json({ ok: false, message: 'User Not Found' });
            return res.json({ ok: true, user });
        } catch (error) {
            return returnServerError(res, error);
        }
    };

    static createUser = async (req: Request, res: Response) => {
        const { username } = req.body;
        if (!username) return res.status(400).json({ ok: false, message: 'User is Required' });

        try {

            const user = await User.create({ username });
            await User.save(user);
            return res.json({ ok: true, message: 'User successfully created', user });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false, message: 'Internal Server Error' });
        }
    };

    static updateUser = async (req: Request, res: Response) => {
        const { username } = req.body;
        const { id } = req.params;

        try {
            const user = await getUser(id);
            if (!user) return res.status(400).json({ ok: false, message: 'User not found' });
            await User.update({ id: parseInt(id) }, { username });
            return res.json({ ok: true, message: 'User successfully updated' });
        } catch (error) {
            returnServerError(res, error);
        }
    };

    static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            if (!getUser(id)) return res.status(404).json({ ok: false, message: 'User Nout Found' });
            await User.delete(id);
            return res.json({ ok: true, message: 'User successfully updated' });
        } catch (error) {
            return returnServerError(res, error);
        }
    };

}