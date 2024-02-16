import { Router } from "express";
import {createUser,
        getUsers,
        getUser,
        updateUser,
        deleteUser}
        from '../controllers/adminUsersController.js';

const router = Router();
/*Traemos toda la información referente a los maestros*/
router.get('/adminUser',getUsers);
/*Obtenemos la información de un maestro en particular con base en su id*/
router.get('/adminUser-getOne',getUser);
/*Agregegamos un nuevo maestro a la db*/
router.post('/adminUser-create',createUser);
/*Editamos la información de un maestro en partiular con base en su id*/
router.put('/adminUser-update/:codigo',updateUser);
/*Elminamos un maesteo de la db con base en su id*/
router.delete('/adminUser-delete/:codigo',deleteUser);

export default router;