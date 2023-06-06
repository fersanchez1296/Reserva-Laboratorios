import { Router } from "express";
import {getSubjects,getCarrera} from '../controllers/adminSubjectsController.js';

const router = Router();
/*Traemos toda la información referente a los maestros*/
router.get('/adminSubjects',getSubjects);

router.get('/adminSubjects/:carrera',getCarrera);

export default router;