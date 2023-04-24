import { Router } from "express";
import { getUsers } from "../controllers/adminUsersController.js";

const router = Router();
/*Traemos toda la información referente a los usuarios*/
router.get('/adminUsers',getUsers);


export default router;