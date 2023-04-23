import express from 'express';
import {PORT} from './config.js';
import cors from 'cors';
import indexRoutes from './routes/index-routes.js'
import adminTeacherRoutes from './routes/adminTeacherRoutes.js'
const app  = express();
app.use(express.json())
{/**
permitimos la comunicación entre el backend y frontend pero unicamente
las peticiones desde el puerto 5173
*/}
app.use(cors());
{/*Rutas del backend*/}
app.use(indexRoutes);
{/*Rutas en las que el frontend realiza peticiones para la información
relazionada con la administración de usuarios.*/}
app.use(adminTeacherRoutes);
/*El servidor se ejecuta en el puerto PORT(3000) */
app.listen(PORT); 
console.log("Server is running");