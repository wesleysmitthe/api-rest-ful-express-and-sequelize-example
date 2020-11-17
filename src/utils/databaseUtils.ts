import fs from "fs";
import ini from "ini";
import path from "path";
import { Sequelize } from "sequelize";
import { validateHost } from "@utils/vallidationUtil";
import { IConnection } from "../__interfaces/connectionInterface";

export class Connection {
    private connection: Sequelize;
    private connectionConfig: IConnection;

    constructor(connect?: IConnection) {
        this.connectionConfig = connect as IConnection;

        try {
            if (!this.connectionConfig) {
                const config = ini.parse(fs.readFileSync(path.join(__dirname, "../config/connectionConfig.ini"), { encoding: "utf-8" }));

                this.connectionConfig = config[config.context];
            }

            this.validateDataConnection(this.connectionConfig);

            this.connection = new Sequelize(
                this.connectionConfig.database,
                this.connectionConfig.username,
                this.connectionConfig.password, {
                host: this.connectionConfig.host,
                dialect: this.connectionConfig.dialect,
                port: this.connectionConfig.port,
            });

            this.connection.authenticate()
                .then(() => {
                    console.log("Connection has been established successfully.");
                })
                .catch((error) => {
                    console.error("Unable to connect to the database:", error);

                    throw error;
                })

        } catch (error) {
            console.error("Validation connection: ", error);

            throw error;
        }
    }

    private validateDataConnection(connect: IConnection) {
        if (!connect.username) {
            throw "username not passed.";

        } else {
            if (!connect.password) {
                throw "password not passed.";

            } else {
                if (!connect.port) {
                    throw "port not passed.";

                } else {
                    if (!connect.database) {
                        throw "database not passed.";

                    } else {
                        if (!connect.host) {
                            throw "host not passed.";

                        } else {
                            if (!validateHost(connect.host)) {
                                throw "host is not valid.";

                            } else {
                                if (!connect.dialect) {
                                    throw "dialect not passed.";
                                }
                            }
                        }
                    }
                }
            }
        }

        return true;
    }

    public getConnection() {
        return this.connection;
    }

}

export const dbConnection = new Connection().getConnection();

