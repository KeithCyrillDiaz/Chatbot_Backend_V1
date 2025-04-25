import { Router } from "express";
import { sendPromptController } from "../../controller/gemini/sendPromptController";
import { authentication } from "../../middleware/authentication";



export default (router: Router) => {

    router.use("/v1", authentication);
    router.post("/v1/sendPrompt", sendPromptController);
}