import { Router } from "express";
import {
  getPractices,
  createPractice,
  getPractice,
  updatePractice,
  deletePractice,
} from "../controllers/adminPracticesController.js";

const router = Router();
/*Traemos toda la información referente a las prácticas*/
router.get("/adminPractices", getPractices);

router.get("/adminPractices/:id", getPractice);

router.put("/adminPractices/:id", updatePractice);

router.post("/adminPractices", createPractice);

router.delete("/adminPractices/:id", deletePractice);

export default router;
