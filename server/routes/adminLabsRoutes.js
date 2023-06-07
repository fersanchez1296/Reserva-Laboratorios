import { Router } from "express";
import {getLabs,getAdminUser,createLab} from '../controllers/adminLabsController.js';

const router = Router();
/*Traemos toda la información referente a los laboratórios*/
router.get('/adminLabs',getLabs);

router.get('/adminLabs-adminUser/:codigo',getAdminUser);

router.post('/adminLabs/',createLab);

export default router;