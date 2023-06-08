import { Router } from "express";
import {getLabs,getAdminUser,createLab,getLab,updateLab} from '../controllers/adminLabsController.js';

const router = Router();
/*Traemos toda la información referente a los laboratórios*/
router.get('/adminLabs',getLabs);

router.get('/adminLabs/:id',getLab);

router.get('/adminLabs-adminUser/:codigo',getAdminUser);

router.post('/adminLabs/',createLab);

router.put('/adminLabs/:id',updateLab);

export default router;