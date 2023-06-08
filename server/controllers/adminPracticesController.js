import { pool } from "../db.js";

/*Obtenemos todos las prácticas de la db*/
export const getPractices = async (req, res) => {
  try {
    const [result] = await pool.query(`
        SELECT *
        FROM practicas;`);
    res.send(result);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};

export const createPractice = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const [result] = await pool.query(
      `INSERT INTO 
        practicas 
        (nombre,descripcion)
        VALUES
        (?,?)`,
      [nombre, descripcion]
    );
    res.send(result.data);
  } catch (error) {
    res.send(error);
  }
};

export const getPractice = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * 
        FROM practicas
        WHERE id = (?)`,
      [req.params.id]
    );
    res.send(result.data);
  } catch (error) {
    res.send(error);
  }
};

export const updatePractice = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const [result] = await pool.query(
      `UPDATE practicas
        SET
        nombre = ?,
        descripcion = ?
        WHERE id = (?)`,
      [nombre, descripcion, req.params.id]
    );
    res.send(result.data);
  } catch (error) {
    res.send(error);
  }
};

export const deletePractice = async(req,res) =>{
    try {
        const [result] = await pool.query(`DELETE FROM
        practicas
        WHERE
        id = ?`,[req.params.id]);
        res.send(result.status)
    } catch (error) {
        res.send([error.code,error.errno])
    }
    
};
