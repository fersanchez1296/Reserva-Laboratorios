import { Router } from "express";
import {
  getSubjects,
  getCarrera,
  getCarreras,
  createSubject,
  deleteSubject,
  prueba,
  updateSubject
} from "../controllers/adminSubjectsController.js";

const router = Router();
/*Traemos toda la información referente a los maestros*/
router.get("/adminSubjects/", getSubjects);

router.get("/adminSubjects/:carrera/", getCarrera);

router.get("/adminSubjects-carreras/", getCarreras);

router.get("/subject/:crn/",prueba);

router.put("/subject/:crn/",updateSubject);

router.post("/adminSubjects/", createSubject);

router.delete("/adminSubjects/:crn/", deleteSubject);

export default router;
