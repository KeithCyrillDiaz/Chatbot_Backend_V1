
import dotenv from 'dotenv';

dotenv.config()

export const dotenvValues = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    secretKey: process.env.SECRET_KEY,
    GEMINI: {
       apiKey: process.env.GEMINI_API_KEY,
        modelName: process.env.GEMINI_MODEL_NAME
    },
    MONGODB: {
        local: process.env.MONGODB_URL_LOCAL,
        deployed: process.env.MONGODB_URL_ATLAS
    },
}