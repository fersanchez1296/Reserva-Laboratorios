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
  try {
    const [result] = await pool.query(
      `
        SELECT rol.rol AS rol, concat_ws(" ", nombre,apellido_1,apellido_2) AS nombre,codigo,email,telefono 
        FROM usuario
        INNER JOIN rol ON usuario.rol_id = rol.id
        WHERE codigo = (?);`,
      [req.params.codigo]
    );
    res.send(result);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};

export const createLab = async (req, res) => {
  try {
    const { edificio, nombre, capacidad, admin } = req.body;
    const [result] = await pool.query(
      `
      INSERT INTO 
      laboratorio
      (edificio,nombre,capacidad,usuario_codigo)
      VALUES
      (?,?,?,?)`,
      [edificio, nombre, capacidad, admin]
    );
    res.send(result);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};

export const getLab = async (req, res) => {
  try {
    const [result] = await pool.query(
      `
        SELECT * 
        FROM laboratorio
        WHERE id = (?)`,
      [req.params.id]
    );
    res.send(result);
  } catch (error) {
    res.send([error.code, error.errno]);
  }
};

export const updateLab = async(req,res) =>{
    try {
        const { nombre, edificio, capacidad, admin } = req.body;
        const [result] = await pool.query(`UPDATE laboratorio 
        SET nombre = ?,
        edificio = ?,
        capacidad = ?
        usuario_codigo = ?
        WHERE
        id = ?`,[nombre, edificio, capacidad, admin,req.params.codigo]);
        res.send(result.status)
    } catch (error) {
        res.send([error.code,error.errno])
    }
    
};

export const deleteLab = async(req,res) =>{
    try {
        const [result] = await pool.query(`DELETE FROM
        laboratorio
        WHERE
        id = ?`,[req.params.id]);
        res.send(result.status)
    } catch (error) {
        res.send([error.code,error.errno])
    }
    
};
