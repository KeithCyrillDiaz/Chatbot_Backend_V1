import { Request, Response, NextFunction } from "express"
import { logger } from "../../utility/logger";
import { sendPrompt } from "../../service/gemini";
import { PromptsModel } from "../../model/promptsModel";


export const sendPromptController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.event("sendPromptController is running")

        const {userMessage, assistantMessage, project} = req.body;

        if (!userMessage || !assistantMessage || !project) {
            logger.error("Missing required fields: userMessage, assistantMessage, and project");
            res.status(400).json({
                code: "SPC_001",
                message: "Missing required fields: userMessage, assistantMessage, and project"
            });

            return;
        }

        const result = await sendPrompt(userMessage);

        if(!result) {
            logger.error("Failed sending prompt");
            res.status(500).json({
                code: "SPC_000",
                message: "Failed sending prompt"
            });
            return;
        }

        const newPrompt = new PromptsModel({
            userMessage,
            assistantMessage,
            projectName: project,
        });

        const saveResult = await newPrompt.save();

        res.status(200).json({
            code: "SPC_000",
            message: "Succesfully Sent Prompt",
            result: result,
            text: result.text(),
            saveResult,
        })

        return;

    } catch (error) {
        next(error);
    }
}