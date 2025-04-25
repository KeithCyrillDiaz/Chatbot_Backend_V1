import { Request, Response, NextFunction } from "express"
import { logger } from "../utility/logger"
import { dotenvValues } from "../config/dotenv";
import { generateToken } from "../utility/token";


export const loginController = async (req: Request, res: Response, next: NextFunction) => {

    const UNAUTHORIZED = {
        code: "login_001",
        message: "Bad Request"
    }
    try {

        logger.event("A user is Logging in");

        const {username, password} = req.body;

        if(!username || !password) {
            logger.error("Username and password are required");
            res.status(401).json(UNAUTHORIZED);
            return;
        }

        const {username: envUsername, password: envPassword} = dotenvValues;

        if(username !== envUsername || password !== envPassword) {
            logger.error("Username and password are required");
            res.status(401).json(UNAUTHORIZED);
            return;
        }

        logger.success(`${username} has logged in`);

        const token = generateToken(username);

        res.status(200).json({
            code: "login_000",
            message: "Logged in Successfully",
            token
        })
        
    } catch (error) {
        next(error);
    }
}