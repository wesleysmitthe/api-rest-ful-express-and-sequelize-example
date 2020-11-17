import { userModel } from "./_MER/userModel";
import { Order, Transaction } from "sequelize";

import { dbConnection } from "@utils/databaseUtils";

import { IUser } from "../__interfaces/daoUserInterface";
import { IQueryStorage } from "../__interfaces/queryStorageInterface";
import { IDaoSequelizeStorage } from "../__interfaces/daoSequelizeStorageInterface";

export class UserDao implements IDaoSequelizeStorage<IUser>{
    constructor() {
    }

    create(userObj: IUser, transaction?: Transaction): Promise<any> {
        if (!!transaction) {
            return userModel.create(userObj, { transaction: transaction });

        } else {
            return dbConnection.transaction((transaction: Transaction) => {
                return userModel.create(userObj, { transaction: transaction })
            });
        }
    }


    remove(userObj: IUser, transaction?: Transaction): Promise<any> {
        if (!!transaction) {
            return userModel.destroy({
                where: {
                    id: userObj.id
                }, transaction: transaction,
            })
                .then((result) => {
                    return { "message": `User ${!result ? "not " : ""}deleted`, deleted: !!result };
                })

        } else {
            return dbConnection.transaction((transaction: Transaction) => {
                return userModel.destroy({
                    where: {
                        id: userObj.id
                    }, transaction: transaction,
                })
                    .then((result) => {
                        return { "message": `User ${!result ? "not " : ""}deleted`, deleted: !!result };
                    })
            });
        }
    }


    update(userObj: IUser, transaction?: Transaction): Promise<any> {
        if (!!transaction) {
            return userModel.update(userObj,
                {
                    where: {
                        id: userObj.id
                    }, transaction: transaction,
                })
                .then(() => {
                    return userObj;
                })

        } else {
            return dbConnection.transaction((transaction: Transaction) => {
                return userModel.update(userObj,
                    {
                        where: {
                            id: userObj.id
                        }, transaction: transaction,
                    })
                    .then(() => {
                        return userObj;
                    })
            });
        }
    }


    public getById(id: number, transaction?: Transaction): Promise<any | null> {
        const include = [] as any;

        return userModel.findOne({
            where: { id: id, },
            include: include,
        })
            .then((userInstace: any) => {
                return userInstace.dataValues;
            })
    }


    public getList(query: IQueryStorage<IUser>, transaction?: Transaction): Promise<{ count: number, data: any[] }> {
        // add your includes here
        let include: Array<any> = [];
        const limit: number = !!query.limit ? query.limit : null as any;
        const order: Array<Array<Order>> = [[query.orderby || "id", query.order || "ASC"]];

        // or here  
        // include.push({
        //     model: "modelname",
        //     where: "whereOptions",
        // });

        return userModel.findAll({
            include: include,
            where: query.where,
            limit: limit,
            order: order as any,
        })
            .then((userInstace: any) => {
                let userList: Array<any> = [];

                userInstace.forEach((dataRow: any) => {
                    userList.push(dataRow.dataValues);
                })

                return { count: userList.length, data: userList };
            })
    }
}
