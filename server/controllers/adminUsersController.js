import { pool } from "../db.js";

/*Creamos un maestro en la db*/
export const createUser = async (req, res) => {
  try {
    const {
      codigo,
      correo,
      rol_id,
      nombre,
      apellido_1,
      apellido_2,
      telefono,
      password,
    } = req.body;
    const [result] = await pool.query(
      `INSERT INTO 
            usuario 
            (codigo,correo,rol_id,nombre,apellido_1,apellido_2,telefono,password)
            VALUES
            (?,?,?,?,?,?,?,?)`,
      [
        codigo,
        correo,
        rol_id,
        nombre,
        apellido_1,
        apellido_2,
        telefono,
        password,
      ]
    );
    if (result.affectedRows > 0) {
      // Send a success response with additional information
      res.send({
        success: true,
        message: "Created successful",
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
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating user",
      error: {
        code: error.code,
        errno: error.errno,
        message: error.message,
      },
    });
  }
};
/*Obtenemos todos los maestros de la db*/
export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query(`
    SELECT 
    usuario.codigo,CONCAT_WS(' ',usuario.nombre,usuario.apellido_1,usuario.apellido_2) nombre,usuario.telefono,usuario.correo,
    rol.rol
    FROM usuario
    join rol on usuario.rol_id = rol.id;`);
    res.send(result);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};
/*Obtenemos la información de un maestro de la db*/
export const getUser = async (req, res) => {
  const user = req.query.search;
  try {
    const [result] = await pool.query(
      `
      SELECT usuario.codigo,usuario.nombre,usuario.apellido_1,usuario.apellido_2, usuario.password,
      usuario.correo,usuario.telefono, usuario.rol_id, rol.rol
      FROM usuario
      JOIN rol on usuario.rol_id = rol.id
      Where codigo = ?
      UNION
      SELECT NULL as codigo, NULL as nombre,NULL as apellido_1,NULL as apellido_2,
      NUll as password,Null as correo,NULL as telefono,NULL as rol_id, rol
      FROM reservas.rol`,
      [user]
    );
    const formattedResult = {
      users: [],
      rols: [],
    };

    result.forEach((row) => {
      if (row.codigo !== null) {
        formattedResult.users.push({
          codigo: row.codigo,
          nombre: row.nombre,
          apellido_1 : row.apellido_1,
          apellido_2 : row.apellido_2,
          password : row.password,
          correo: row.correo,
          telefono: row.telefono,
          rol : row.rol,
          rol_id: row.rol_id,
        });
      }

      if (row.rol !== null && !formattedResult.rols.includes(row.rol)) {
        formattedResult.rols.push(row.rol);
      }
    });

    res.send(formattedResult);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};
/*Actualizamos la información de un maestro de la db*/
export const updateUser = async (req, res) => {
  try {
    delete req.body.rol;
    const columnsToUpdate = Object.keys(req.body)
      .map((key) => `${key} = ?`)
      .join(", ");

    const [result] = await pool.execute(
      `UPDATE usuario 
       SET ${columnsToUpdate}
       WHERE
       codigo = ?`,
      [...Object.values(req.body), req.params.codigo]
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
      message: "Error updating user",
      error: {
        code: error.code,
        errno: error.errno,
        message: error.message,
      },
    });
  }
};

/*Eliminamos un maestro de la db*/
export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query(
      `DELETE FROM
        usuario
        WHERE
        codigo = ?`,
      [req.params.codigo]
    );
    if (result.affectedRows > 0) {
      // Send a success response with additional information
      res.send({
        success: true,
        message: "Deleted Successfuly",
      });
    } else {
      // Send a response indicating that no rows were updated
      res.send({
        success: false,
        message: "Deleted Successfuly",
      });
    }
  } catch (error) {
    // Send an error response with details
    res.status(500).send({
      success: false,
      message: "Error Deleting",
      error: {
        code: error.code,
        errno: error.errno,
        message: error.message,
      },
    });
  }
};
