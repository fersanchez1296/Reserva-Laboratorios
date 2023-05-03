import { pool } from "../db.js";


/*Obtenemos todos los maestros de la db*/
export const getTools = async(req,res) =>{
    try {
        const [result] = await pool.query(`
        SELECT id,nombre 
        FROM equipo;`);
        res.send(result)
    } catch (error) {
        res.send([error.code,error.errno])
    }
    
}

/*Creamos un equipo en la db*/
export const createTool = async (req,res) =>{
    try {
        const {nombre,descripcion,cantidad} = req.body;
        const [result] = await pool.query(`INSERT INTO 
        equipo
        (nombre,descripcion,cantidad)
        VALUES
        (?,?,?)`,
        [nombre,descripcion,cantidad]);
        res.send(result.data);
    } catch (error) {
        res.send(error)
    }
    
}

/*Obtenemos la información de un equipo de la db*/
export const getTool = async(req,res) =>{
    try {
        const [result] = await pool.query(`SELECT * FROM
        equipo 
        WHERE 
        id = (?)`,[req.params.id]);
        res.send(result)
    } catch (error) {
        res.send([error.code,error.errno])
    }
    

}