import express from 'express';
import {PORT} from './config.js';
import cors from 'cors';
import indexRoutes from './routes/index-routes.js'
import adminTeacherRoutes from './routes/adminTeacherRoutes.js'
import adminSubjectsRoutes from './routes/adminSubjectsRoutes.js'
import adminUsersRoutes from './routes/adminUsersRoutes.js'
import adminToolsRoutes from './routes/adminToolsRoutes.js'
import adminLabsRoutes from './routes/adminLabsRoutes.js'
import adminPracticesRoutes from './routes/adminPracticesRoutes.js'
const app  = express();
app.use(express.json())
{/**
permitimos la comunicación entre el backend y frontend.
*/}
app.use(cors());
{/*Rutas del backend*/}
app.use(indexRoutes);
{/*Rutas en las que el frontend realiza peticiones para la información
relazionada con la administración de usuarios.*/}
app.use(adminTeacherRoutes,adminSubjectsRoutes,adminUsersRoutes,
    adminToolsRoutes,adminLabsRoutes,adminPracticesRoutes);
/*El servidor se ejecuta en el puerto PORT(3000) */
app.listen(PORT); 
console.log("Server is running");