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
import login from './routes/loginRoute.js'
const app  = express();
app.use(express.json())
{/**
permitimos la comunicación entre el backend y frontend.
*/}
// Middleware para configurar las cabeceras CORS
app.use(function(req, res, next) {
        // Permitir solicitudes desde cualquier origen
        res.setHeader('Access-Control-Allow-Origin', '*');
      
        // Permitir los métodos especificados
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      
        // Permitir las cabeceras especificadas
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
        // Continuar con el siguiente middleware
        next();
      });
{/*Rutas del backend*/}
app.use(indexRoutes);
{/*Rutas en las que el frontend realiza peticiones para la información
relazionada con la administración de usuarios.*/}
app.use(adminTeacherRoutes,adminSubjectsRoutes,adminUsersRoutes,
        adminToolsRoutes,adminLabsRoutes,adminPracticesRoutes,login);
/*El servidor se ejecuta en el puerto PORT(3000) */
app.listen(PORT); 
console.log("Server is running");