import { Router } from "express";
import {
  getLabs,
  getAdminUser,
  createLab,
  getLab,
  updateLab,
  deleteLab,
} from "../controllers/adminLabsController.js";

const router = Router();
/*Traemos toda la información referente a los laboratórios*/
router.get("/adminLabs", getLabs);

router.get("/adminLabs/:id", getLab);

router.get("/adminLabs-adminUser/:codigo", getAdminUser);

router.post("/adminLabs/", createLab);

router.put("/adminLabs/:id", updateLab);

router.delete("/adminLabs/:id", deleteLab);

export default router;
