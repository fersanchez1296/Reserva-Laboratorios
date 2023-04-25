import { pool } from "../db.js";


/*Obtenemos todos los maestros de la db*/
export const getLabs = async(req,res) =>{
    try {
        const [result] = await pool.query(`
        SELECT laboratorio.nombre,laboratorio.edificio,laboratorio.capacidad, CONCAT_WS(" ", usuario.nombre,usuario.apellido_1,
        usuario.apellido_2) as responsable
        FROM laboratorio
        INNER JOIN usuario
        ON laboratorio.usuario_codigo = usuario.codigo;`);
        res.send(result)
    } catch (error) {
        res.send([error.code,error.errno])
    }
    
}