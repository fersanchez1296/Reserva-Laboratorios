import { Router } from "express";
import {getLabs,getAdminUser} from '../controllers/adminLabsController.js';

const router = Router();
/*Traemos toda la información referente a los laboratórios*/
router.get('/adminLabs',getLabs);

router.get('/adminLabs-adminUser/:codigo',getAdminUser);

export default router;