import { Request, Response } from "express";
import { createJobSchema } from "./job.validation";
import { createJob } from "./job.service"

export const createJobController = async (req: Request, res: Response) => {
    try {
        // validate input
        const parsedData = createJobSchema.parse(req.body);

        // companyId is usually from params or auth (adjust as needed)
        const { companyId } = req.params;

        const job = await createJob(companyId, parsedData);

        res.status(201).json(job);
    } catch (error: any) {
        if (error.name === "ZodError") {
            return res.status(400).json({ errors: error.errors });
        }
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
