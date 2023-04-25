import { Router } from "express";
import { getPractices } from "../controllers/adminPracticesController.js";

const router = Router();
/*Traemos toda la información referente a las prácticas*/
router.get('/adminPractices',getPractices);

export default router;