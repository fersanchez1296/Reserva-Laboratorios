import { Router } from "express";
import {getSubjects,getCarrera,getCarreras} from '../controllers/adminSubjectsController.js';

const router = Router();
/*Traemos toda la información referente a los maestros*/
router.get('/adminSubjects',getSubjects);

router.get('/adminSubjects/:carrera',getCarrera);

router.get('/adminSubjects/carreras',getCarreras);

export default router;