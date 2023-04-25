import { pool } from "../db.js";


/*Obtenemos todos las prácticas de la db*/
export const getPractices = async(req,res) =>{
    try {
        const [result] = await pool.query(`
        SELECT id,nombre,descripcion
        FROM practicas;`);
        res.send(result)
    } catch (error) {
        res.send([error.code,error.errno])
    }
    
}