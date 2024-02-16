import { pool } from "../db.js";

/*Obtenemos todos los maestros de la db*/
export const getLabs = async (req, res) => {
  try {
    const [result] = await pool.query(`
        SELECT laboratorio.id, laboratorio.nombre,laboratorio.edificio,laboratorio.capacidad, CONCAT_WS(" ", usuario.nombre,usuario.apellido_1,
        usuario.apellido_2) as responsable
        FROM laboratorio
        INNER JOIN usuario
        ON laboratorio.usuario_codigo = usuario.codigo;`);
    res.send(result);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};

export const getAdminUser = async (req, res) => {
  const codigo = req.body.codigo
  console.log(req.body)
  try {
    const [[result]] = await pool.query(
      `
      SELECT concat_ws(" ", usuario.nombre, usuario.apellido_1,usuario.apellido_2) as responsable
      FROM usuario
      WHERE usuario.codigo = ?;`,
      [codigo]
    );
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

export const createLab = async (req, res) => {
  try {
    delete req.body.id;
    delete req.body.responsable;
    delete req.body.codigo_responsable;
    const columnsKeys = Object.keys(req.body)
    const [result] = await pool.query(
      `
      INSERT INTO 
      laboratorio
      (${columnsKeys})
      VALUES
      (?,?,?,?)`,[...Object.values(req.body)]
    );
    if (result.affectedRows > 0) {
      // Send a success response with additional information
      res.send({
        success: true,
        message: "Created successfully",
        updatedRows: result.affectedRows,
      });
    } else {
      // Send a response indicating that no rows were updated
      res.send({
        success: false,
        message: "No rows updated",
      });
    }
  } catch (error) {
    console.log(error);
    // Send an error response with details
    res.status(500).send({
      success: false,
      message: "Error Creating Lab",
      error: {
        code: error.code,
        errno: error.errno,
        message: error.message,
      },
    });
  }
};

export const getLab = async (req, res) => {
  try {
    const [result] = await pool.query(
      `
      SELECT laboratorio.id,laboratorio.nombre, laboratorio.edificio, laboratorio.capacidad, 
      concat_ws(" ", usuario.nombre, usuario.apellido_1,usuario.apellido_2) as responsable
      FROM reservas.laboratorio
      inner join usuario on laboratorio.usuario_codigo = usuario.codigo
      WHERE laboratorio.id = ?;`,
      [req.query.search]
    );
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send([error.code, error.errno]);
  }
};

export const updateLab = async (req, res) => {
  try {
    delete req.body.responsable;
    const columnsToUpdate = Object.keys(req.body)
      .map((key) => `${key} = ?`)
      .join(", ");
    const [result] = await pool.query(
      `UPDATE laboratorio 
        SET ${columnsToUpdate}
        WHERE
        id = ?`,
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
      // Send a response indicating that no rows were updated
      res.send({
        success: false,
        message: "No rows updated",
      });
    }
  } catch (error) {
    // Send an error response with details
    res.status(500).send({
      success: false,
      message: "Error updating Lab",
      error: {
        code: error.code,
        errno: error.errno,
        message: error.message,
      },
    });
  }
};

export const deleteLab = async (req, res) => {
  try {
    const [result] = await pool.query(
      `DELETE FROM
        laboratorio
        WHERE
        id = ?`,
      [req.params.id]
    );
    res.send(result.status);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};
