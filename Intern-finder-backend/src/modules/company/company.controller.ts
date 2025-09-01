import { registerStep1, registerStep2, topCompany } from "./company.service";
import { Request, Response } from "express";

export const registerStep1Handler = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const company = await registerStep1(data);
        res.status(201).json(company);
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
        const { companyId, ...data } = req.body;
        const company = await registerStep2(companyId, data);
        res.status(200).json(company);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: String(error) });
        }
    }
}; 

export const topCompanyHandler = async (req: Request, res: Response) => {
    try {
        const companies = await topCompany();
        res.status(200).json(companies);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: String(error) });
        }
    }
};