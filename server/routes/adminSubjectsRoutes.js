import { Router } from "express";
import {getSubjects} from '../controllers/adminSubjectsController';

const router = Router();
/*Traemos toda la información referente a los maestros*/
router.get('/adminSubjects',getSubjects);

export default router;