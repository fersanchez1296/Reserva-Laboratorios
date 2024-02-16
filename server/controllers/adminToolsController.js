import { pool } from "../db.js";


/*Obtenemos todos los maestros de la db*/
export const getTools = async(req,res) =>{
    try {
        const [result] = await pool.query(`
        SELECT *
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
        id = ?`,[req.query.search]);
        res.send(result)
    } catch (error) {
        res.send([error.code,error.errno])
    }
    

}

/*Actualizamos la información de un maestro de la db*/
export const updateTool = async (req, res) => {
    try {
      const columnsToUpdate = Object.keys(req.body)
        .map((key) => `${key} = ?`)
        .join(", ");
        console.log(req.params.id)
      const [result] = await pool.query(
        `UPDATE equipo 
          SET ${columnsToUpdate}
          WHERE
          id = ?`,
        [...Object.values(req.body), req.params.id]
      );
      console.log(result);
      if (result.affectedRows > 0) {
        // Send a success response with additional information
        res.send({
          success: true,
          message: "Update successful",
          updatedRows: result.affectedRows,
        });
      } else {
        res.send({
          success: false,
          message: "No rows updated",
        });
      }
    } catch (error) {
      // Send an error response with details
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error updating DataBase",
        error: {
          code: error.code,
          errno: error.errno,
          message: error.message,
        },
      });
    }
  };
  

/*Eliminamos un maestro de la db*/
export const deleteTool = async(req,res) =>{
    try{
        const [result] = await pool.query(`DELETE FROM
        equipo
        WHERE
        id = ?`,[req.params.id]);
        res.send(result.data)
    }
    catch(error){
        res.send([error.code,error.errno])
    }
    

}