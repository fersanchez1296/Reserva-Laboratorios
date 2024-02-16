import { pool } from "../db.js";

/*Obtenemos todos los maestros de la db*/
export const getSubjects = async (req, res) => {
  try {
    const [result] = await pool.query(`
        SELECT materia.crn,materia.clave,materia.nombre,grupo.nombre as semestre,carrera.nombre as carrera
        FROM materia
        INNER JOIN grupo 
        ON materia.grupo_idgrupo = grupo.idgrupo
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


export const getSubject = async (req, res) => {
  try {
    const [result] = await pool.query(
      `
      SELECT 
        materia.crn, materia.clave, materia.nombre, 
        grupo.nombre as semestre, carrera.nombre as carrera
      FROM 
        reservas.materia
      JOIN 
        grupo ON materia.grupo_idgrupo = grupo.idgrupo
      JOIN 
        carrera ON grupo.carrera_clave = carrera.clave
      WHERE materia.crn = ?`,
      [req.body.crn]
    );

    const [gruposQuery] = await pool.query(`
    SELECT
        grupo.idgrupo, grupo.nombre as grupo
      FROM 
        reservas.grupo
      WHERE
        grupo.carrera_clave = ?
    `,[req.body.carrera_clave]);
    const grupos = gruposQuery.map(grupo => ({
      "grupo": grupo.grupo,
      "id": grupo.idgrupo
  }));

    const [carrerasQuery] = await pool.query(`
    SELECT 
        carrera.nombre as carrera
      FROM 
        reservas.carrera
    `);
    const carreras = carrerasQuery.map(carrera => carrera.carrera);

    res.send({result,carreras,grupos});
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const [result] = await pool.query(
      `DELETE FROM
      materia
      WHERE
      crn = ?`,
      [req.params.crn]
    );
    res.send(result.data);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};

export const prueba = async (req, res) => {
  try {
    const [gruposQuery] = await pool.query(`
    SELECT DISTINCT
        grupo.idgrupo, grupo.nombre as grupo
      FROM 
        reservas.grupo
    `);

    const grupos = gruposQuery.map(grupo => ({
      "grupo": grupo.grupo,
      "id": grupo.idgrupo
  }));
    res.send({grupos});
  } catch (error) {
    console.log(error);
    res.send("adios");
  }
};

export const updateSubject = async (req, res) => {
  console.log("antes eliminar", req.body);
  try {
    delete req.body.semestre;
    delete req.body.carrera;
    console.log("despues eliminar", req.body);
    const columnsToUpdate = Object.keys(req.body)
      .map((key) => `${key} = ?`)
      .join(", ");
    const [result] = await pool.query(
      `UPDATE materia 
      SET ${columnsToUpdate}
      WHERE
      crn = ?`,
      [...Object.values(req.body), req.params.id]
    );
    if (result.affectedRows > 0) {
      // Send a success response with additional information
      res.send({
        success: true,
        message: "Update successful",
        updatedRows: result.affectedRows,
      });
    } else {
      res.send({
        success: true,
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
