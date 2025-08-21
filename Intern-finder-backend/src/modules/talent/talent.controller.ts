import { registerStep1, registerStep2 } from "./talent.service";
import { Request, Response } from "express";


export const registerStep1Handler = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const talent = await registerStep1(data);
        res.status(201).json(talent);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: String(error) });
        }
    }
};

export const registerStep2Handler = async (req: Request, res: Response) => {
    try {
        const { talentId, ...data } = req.body;
        const talent = await registerStep2(talentId, data);
        res.status(200).json(talent);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: String(error) });
        }
    }
};
