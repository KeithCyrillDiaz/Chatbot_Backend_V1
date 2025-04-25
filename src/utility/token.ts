import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";
import jwt from 'jsonwebtoken';
import { dotenvValues } from "../config/dotenv";

interface tokenPayLoad {
    username: String;
    iat: number;
    exp: number;
}


const getSecretKey = (): string => {
    const {secretKey}= dotenvValues;
        if(!secretKey) {
            logger.error("Secret Key is not found in ENV");
        throw new Error("Secret Key is not found in ENV");
        }
    return secretKey;
}

export const generateToken = (username: string): string | undefined => {
    try {

        const secretKey = getSecretKey();
        
        const token: string = jwt.sign({username}, secretKey, {expiresIn: "1h"});

        return token;
        
    } catch (error) {
        logger.error("Failed to create token")
        throw new Error("Failed to create token");
    }

}

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const authHeaders = req.headers["authorization"];

        if(!authHeaders || authHeaders.split(" ").length < 2 || !authHeaders.startsWith("Bearer ")){
             logger.error("Token is not valid or missing.");
             res.status(401).json({
                code: "AUTH_001",
                message: "Unauthorized User"
             })
             return;
        }

        const token = authHeaders.split(" ")[1];

       const decoded: tokenPayLoad = jwt.verify(token, getSecretKey()) as tokenPayLoad;

       logger.success(`${decoded.username} is logged in`);

    } catch (error) {
        next(error);
    }
}