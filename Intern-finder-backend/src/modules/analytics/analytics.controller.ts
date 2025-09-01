import { NextFunction, Request, Response } from "express";
import { errorResponse, successResponse } from "../../utils/response";
import { getAllAnalytics } from "./analytics.service";


export const getAnalyticsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const analytics = await getAllAnalytics();
        res.status(200).json(successResponse(analytics));
    } catch (error: any) {
        errorResponse(error);
    }
};