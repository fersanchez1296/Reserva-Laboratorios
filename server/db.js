import {createPool} from "mysql2/promise";

export const pool = createPool({
    /*Conexión del backend a la base de datos*/
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: "reservas"
});