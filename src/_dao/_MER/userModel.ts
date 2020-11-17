import { DataTypes } from "sequelize";
import { dbConnection } from "@utils/databaseUtils";


const userModel = dbConnection.define("user",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        paranoid: true,
        timestamps: true,
        freezeTableName: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        deletedAt: "deletedAt",
    }
);


export { userModel };