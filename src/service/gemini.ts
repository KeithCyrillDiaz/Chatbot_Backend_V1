import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, SafetySetting } from "@google/generative-ai";
import { dotenvValues } from "../config/dotenv";
import { logger } from "../utility/logger";

export const sendPrompt = async (prompt: string) => {
    try {
        logger.event("Sending Prompt to Gemini");

        const {apiKey, modelName} = dotenvValues.GEMINI;

        if(!apiKey || !modelName) {
            logger.error("gemini API_KEY or Model Name is not set in env");
            throw new Error("gemini API_KEY or Model Name is not set in env");
        }

        console.log("modelName ", modelName);

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelName });

        const generationConfig = {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048
        };

        const safetySettings: SafetySetting[] = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];

        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: []
        });

        const result = await chat.sendMessage(prompt);
        const response = result.response;
        return response;


    } catch (error) {
        throw new Error("Error sending prompt" + error);
    }
}


export const canSendRequest = ():boolean => {
    return true;
}