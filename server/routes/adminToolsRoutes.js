import { Router } from "express";
import {getTools} from '../controllers/adminToolsController.js';

const router = Router();
/*Traemos toda la información referente a los maestros*/
router.get('/adminTools',getTools);

export default router;