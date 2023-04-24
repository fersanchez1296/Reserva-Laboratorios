import { Router } from "express";
import {getLabs} from '../controllers/adminLabsController.js';

const router = Router();
/*Traemos toda la información referente a los laboratórios*/
router.get('/adminLabs',getLabs);

export default router;