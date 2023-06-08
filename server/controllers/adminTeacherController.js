import { pool } from "../db.js";

    /*Creamos un maestro en la db*/
    export const createTeacher = async (req,res) =>{
        try {
            const {codigo,email,rol_id,nombre,apellido_1,apellido_2,telefono} = req.body;
            const [result] = await pool.query(`INSERT INTO 
            usuario 
            (codigo,email,rol_id,nombre,apellido_1,apellido_2,telefono)
            VALUES
            (?,?,?,?,?,?,?)`,
            [codigo,email,rol_id,nombre,apellido_1,apellido_2,telefono]);
            res.send(result.data);
        } catch (error) {
            res.send(error)
        }
        
    }
/*Obtenemos todos los maestros de la db*/
export const getTeachers = async(req,res) =>{
    try {
        const [result] = await pool.query(`
        SELECT 
        codigo,CONCAT_WS(' ',nombre,apellido_1,apellido_2) nombre,telefono,email
         FROM usuario`);
         res.send(result)
    } catch (error) {
        res.send([error.code,error.errno])
    }
    
}
/*Obtenemos la información de un maestro de la db*/
export const getTeacher = async(req,res) =>{
    try {
        const [result] = await pool.query(`SELECT * FROM
        usuario 
        WHERE 
        codigo = (?)`,[req.params.codigo]);
        res.send(result)
    } catch (error) {
        res.send([error.code,error.errno])
    }
}
/*Actualizamos la información de un maestro de la db*/
export const updateTeacher = async(req,res) =>{
    try {
        const [result] = await pool.query(`UPDATE usuario 
        SET ?
        WHERE
        codigo = ?`,[req.body,req.params.codigo]);
        res.send(result)
    } catch (error) {
        res.send([error.code,error.errno])
    }
    
}
/*Eliminamos un maestro de la db*/
export const deleteTeacher = async(req,res) =>{
    try{
        const [result] = await pool.query(`DELETE FROM
        usuario
        WHERE
        codigo = ?`,[req.params.codigo]);
        res.send(result.data)
    }
    catch(error){
        res.send([error.code,error.errno])
    }
    

}