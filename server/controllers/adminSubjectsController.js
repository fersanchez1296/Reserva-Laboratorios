import { pool } from "../db.js";

/*Obtenemos todos los maestros de la db*/
export const getSubjects = async (req, res) => {
  try {
    const [result] = await pool.query(`
        SELECT crn,materia.nombre,grupo.nombre as semestre,carrera.clave as carrera
        FROM materia
        INNER JOIN grupo 
        ON materia.grupo_id_grupo = grupo.id_grupo
        INNER JOIN carrera 
        ON grupo.carrera_clave = carrera.clave;`);
    res.send(result);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};

export const getCarrera = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT id_grupo, grupo.nombre as grupo
        FROM grupo
        WHERE grupo.carrera_clave = (?)`,
      [req.params.carrera]
    );
    res.send(result);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};

export const getCarreras = async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM carrera`);
    res.send(result);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};

export const createSubject = async (req, res) => {
  try {
    const { crn, clave, nombre, grupo } = req.body;
    const [result] = await pool.query(
      `INSERT INTO 
      materia
      (crn,clave,nombre,grupo_id_grupo)
      VALUES
      (?,?,?,?)`,
      [crn, clave, nombre, grupo]
    );
    res.send(result);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};

export const getSubject = async(req,res) =>{
  try {
      const [result] = await pool.query(`SELECT * FROM
      materia 
      WHERE 
      crn = (?)`,[req.params.crn]);
      res.send("hola")
  } catch (error) {
      res.send([error.code,error.errno])
  }
}


export const deleteSubject = async(req,res) =>{
  try{
      const [result] = await pool.query(`DELETE FROM
      materia
      WHERE
      crn = ?`,[req.params.crn]);
      res.send(result.data)
  }
  catch(error){
      res.send([error.code,error.errno])
  }
  

}