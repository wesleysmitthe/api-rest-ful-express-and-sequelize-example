import { IQueryStorage } from "../__interfaces/queryStorageInterface";
import { Transaction } from "sequelize/types";

export interface IDaoSequelizeStorage<T> {
    remove(obj: T, transaction ?: Transaction): Promise<any>;
    update(obj: T, transaction ?: Transaction): Promise<any>;
    create(obj: T, transaction ?: Transaction): Promise<any>;
    getById(id: number, transaction ?: Transaction): Promise<any>;
    getList(query?: IQueryStorage<T>, transaction ?: Transaction): Promise<any>;
}