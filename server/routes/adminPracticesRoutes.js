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

router.get("/adminPractices-getOne", getPractice);

router.put('/adminPractices-update/:id/',updatePractice);

router.post("/adminPractices-create", createPractice);

router.delete("/adminPractices-delete/:id", deletePractice);

export default router;
