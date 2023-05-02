import { Router } from "express";
import {getTools,createTool} from '../controllers/adminToolsController.js';

const router = Router();
/*Traemos toda la información referente al equipo*/
router.get('/adminTools',getTools);
/*Agregegamos un nuevo equipo a la db*/
router.post('/adminTools',createTool);

export default router;