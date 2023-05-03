import { Router } from "express";
import {getTools,createTool,getTool} from '../controllers/adminToolsController.js';

const router = Router();
/*Traemos toda la información referente al equipo*/
router.get('/adminTools',getTools);
/*Agregegamos un nuevo equipo a la db*/
router.post('/adminTools',createTool);
/*Ontenemos la información de un equipo en especifico de la db*/
router.get('/adminTools/:id',getTool);

export default router;