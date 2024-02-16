import { Router } from "express";
import {getTools,createTool,getTool,deleteTool,updateTool} from '../controllers/adminToolsController.js';

const router = Router();
/*Traemos toda la información referente al equipo*/
router.get('/adminTools',getTools);
/*Agregegamos un nuevo equipo a la db*/
router.post('/adminTools-create',createTool);
/*Obtenemos la información de un equipo en especifico de la db*/
router.get('/adminTools-getOne',getTool);
/*Editamos la información de un maestro en partiular con base en su id*/
router.put('/adminTools-update/:id',updateTool);
/*Obtenemos la información de un equipo en especifico de la db*/
router.delete('/adminTools-delete/:id',deleteTool);
export default router;