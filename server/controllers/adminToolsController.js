import { pool } from "../db.js";


/*Obtenemos todos los maestros de la db*/
export const getTools = async(req,res) =>{
    try {
        const [result] = await pool.query(`
        SELECT cantidad,nombre, descripcion 
        FROM equipo;`);
        res.send(result)
    } catch (error) {
        res.send([error.code,error.errno])
    }
    
}