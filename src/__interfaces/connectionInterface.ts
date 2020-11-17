export interface IConnection {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    dialect: "mysql" | "mariadb" | "postgres" | "mssql";
}