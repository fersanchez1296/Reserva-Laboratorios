import { pool } from "../db.js";

/*Obtenemos todos los maestros de la db*/
export const getLabs = async (req, res) => {
  try {
    const [result] = await pool.query(`
        SELECT laboratorio.nombre,laboratorio.edificio,laboratorio.capacidad, CONCAT_WS(" ", usuario.nombre,usuario.apellido_1,
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
  try {
    const [result] = await pool.query(`
        SELECT rol.rol AS rol, concat_ws(" ", nombre,apellido_1,apellido_2) AS nombre,codigo,email,telefono 
        FROM usuario
        INNER JOIN rol ON usuario.rol_id = rol.id
        WHERE codigo = (?);`,[req.params.codigo]);
    res.send(result);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};
