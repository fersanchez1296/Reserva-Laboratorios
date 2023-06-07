import { Router } from "express";
import {
  getSubjects,
  getCarrera,
  getCarreras,
  createSubject,
  getMateria,
  deleteSubject,
} from "../controllers/adminSubjectsController.js";

const router = Router();
/*Traemos toda la información referente a los maestros*/
router.get("/adminSubjects/", getSubjects);

router.get("/adminSubjects/:carrera/", getCarrera);

router.get("/adminSubjects-carreras/", getCarreras);

router.get("/adminSubjects/:crn/", getMateria);

router.post("/adminSubjects/", createSubject);

router.delete("/adminSubjects/:crn/", deleteSubject);

export default router;
