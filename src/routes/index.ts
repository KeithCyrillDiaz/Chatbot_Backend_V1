import { Router } from "express"
import prompts from "./gemini/prompts";
import login from "./login";



const router = Router();

export default () => {
    login(router);
    prompts(router);
    return router;
}