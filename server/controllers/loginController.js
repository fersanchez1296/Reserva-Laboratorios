import { pool } from "../db.js";

export const login = async (req, res) => {
  const { codigo, password } = req.body;
  console.log('Parámetros recibidos del frontend:', { codigo, password });
  try {
    const [result] = await pool.query(
      `
      SELECT CONCAT_WS(" ", nombre, apellido_1, apellido_2) as nombre, rol.rol
      FROM usuario
      INNER JOIN rol ON usuario.rol_id = rol.id
      WHERE usuario.codigo = ? AND usuario.password =?;
      `,
      [codigo, password]
    );
    if(result.length !== 0){
      res.send({
        success: true,
        message: "Bienvendio " + result[0].nombre,
        rol : result[0].rol,
        nombre : result[0].nombre
      });
    }
    else { 
      res.send({
        success: false,
        message: "Lo siento, los datos de este usuario no coinciden",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: "Ha ocurrido un error",
      error: {
        code: error.code,
        errno: error.errno,
        message: error.message,
      },
    });
  }
};
