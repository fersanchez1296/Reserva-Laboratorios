import { pool } from "../db.js";


/*Obtenemos todos los maestros de la db*/
export const getSubjects = async(req,res) =>{
    try {
        const [result] = await pool.query(`
        SELECT crn,materia.nombre,grupo.nombre as semestre,carrera.clave as carrera
        FROM materia
        INNER JOIN grupo 
        ON materia.grupo_idgrupo = grupo.idgrupo
        INNER JOIN carrera 
        ON grupo.carrera_clave = carrera.clave;`);
         res.send(result)
    } catch (error) {
        res.send([error.code,error.errno])
    }
    
}