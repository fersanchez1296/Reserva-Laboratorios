import { pool } from "../db.js";

/*Obtenemos todos los usuarios de la db*/
export const getUsers = async(req,res) =>{
    try {
        const [result] = await pool.query(`
        SELECT concat_ws(" ", nombre,apellido_1,apellido_2 ) as nombre, rol.rol 
        FROM usuario
        INNER JOIN rol ON usuario.rol_id = rol.id`);
         res.send(result)
    } catch (error) {
        res.send([error.code,error.errno])
    }
    
}