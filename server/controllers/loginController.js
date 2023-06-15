import { pool } from "../db.js";

export const login = async (req, res) => {
  const { user, password } = req.query;
  try {
    const [result] = await pool.query(
      `
      SELECT CONCAT_WS(" ", nombre, apellido_1, apellido_2) as nombre, rol.rol
      FROM usuario
      INNER JOIN rol ON usuario.rol_id = rol.id
      WHERE usuario.codigo = ? AND usuario.password = ?;
      `,
      [user, password]
    );
    res.send(result[0]);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};
