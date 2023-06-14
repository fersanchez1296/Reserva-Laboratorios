import { Router } from "express";
import { login } from "../controllers/loginController";


const router = Router();

router.get("login/:codigo",login);

export default router;