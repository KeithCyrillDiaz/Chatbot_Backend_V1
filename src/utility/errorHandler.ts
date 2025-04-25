import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";

interface CustomError extends Error{
    status?: number;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next:NextFunction) => {
   
    logger.event("Running Error Handler")

    const ERROR_MESSAGE = {
        code: "ERR_001",
        status: err.name === "JsonWebTokenError" || err.message === "jwt expired" ? 401 : err.status || 500,
        message: err.message,
      };

    res.status(ERROR_MESSAGE.status).json(ERROR_MESSAGE);
    logger.error(ERROR_MESSAGE.message);
    return;

}

export default errorHandler;