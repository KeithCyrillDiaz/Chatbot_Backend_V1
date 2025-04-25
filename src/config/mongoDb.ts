import mongoose from "mongoose";
import { logger } from "../utility/logger";
import { dotenvValues } from "./dotenv";

type devEnvironment =  "Local" | "Deployed";

export const connectToMongoDB = async (dev: devEnvironment) => {
    try {
        logger.event("Connecting to MongoDb");

        const {deployed, local} = dotenvValues.MONGODB;

        const MongoDB_URL = dev === "Local" ? local : deployed;

        mongoose.Promise = Promise;

        if(!MongoDB_URL) {
            logger.error("MongoDB URL is not defined in env");
            throw new Error("MongoDB URL is not defined in env");
        }

        await mongoose.connect(MongoDB_URL);

        if (dev === "Local") {
            console.log("Ready - ".green + "MongoDB is running locally");
        } else {
            console.log("Ready - ".green + "MongoDB is running in Atlas");
        }

    } catch (error) {
        logger.error("Error connecting to MongoDB");
        throw new Error ("Error Connecting to Mongodb");
    }
}