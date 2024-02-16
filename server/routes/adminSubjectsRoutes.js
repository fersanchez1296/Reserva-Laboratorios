import { Router } from "express";
import {
  getSubjects,
  getSubject,
  createSubject,
  deleteSubject,
  updateSubject,
  prueba
} from "../controllers/adminSubjectsController.js";

const router = Router();
/*Traemos toda la información referente a los maestros*/
router.get("/adminSubjects/", getSubjects);

router.post("/adminSubjects-getOne", getSubject);

router.post("/adminSubjects-prueba", prueba);

router.put("/adminSubjects-update/:id",updateSubject);

router.post("/adminSubjects-create/", createSubject);

router.delete("/adminSubjects-delete/:crn/", deleteSubject);

export default router;
