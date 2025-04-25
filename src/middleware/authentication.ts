import { Request, Response, NextFunction } from "express"
import { logger } from "../utility/logger"
import { validateToken } from "../utility/token";


export const authentication = async (req: Request, res: Response, next: NextFunction) => {
        try {

            logger.event("Checking Authentication");
           await validateToken(req, res, next);

           next();
            
        } catch (error) {
            next(error);
        }
}