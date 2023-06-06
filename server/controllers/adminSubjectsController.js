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
      `SELECT carrera.nombre as carrera, grupo.nombre as grupo
        FROM carrera
        INNER JOIN grupo ON carrera.clave = grupo.carrera_clave
        WHERE grupo.carrera_clave = (?)`,
      [req.params.carrera]
    );
    res.send(result);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};
