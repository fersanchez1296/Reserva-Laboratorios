import { Router } from "express";
import {
  getLabs,
  createLab,
  getLab,
  updateLab,
  deleteLab,
} from "../controllers/adminLabsController.js";

const router = Router();
/*Traemos toda la información referente a los laboratórios*/
router.get("/adminLabs", getLabs);

router.get("/adminLabs-getOne", getLab);

router.post("/adminLabs-create", createLab);

router.put("/adminLabs-update/:id", updateLab);

router.delete("/adminLabs-delete/:id", deleteLab);

export default router;
