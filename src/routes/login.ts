import { Router } from "express";
import { loginController } from "../controller/logIn";



export default(router: Router) => {
    router.post("/login", loginController);
}