import { Router } from "express";



const router = Router();

router.get("login/:codigo",login);

export default router;