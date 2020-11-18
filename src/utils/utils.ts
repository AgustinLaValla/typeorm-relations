import { Response } from "express";

export const returnServerError = (res:Response, error:any) => {
    console.log(error);
    return res.status(500).json({ok: false, message: 'Internal Server Error'});
}