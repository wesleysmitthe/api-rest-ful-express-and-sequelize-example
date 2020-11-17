import { AndOperator, GroupOption, Order, WhereOptions, } from "sequelize/types";

export interface IQueryStorage<T> {
    offset?: number,
    orderby?: Order,
    between?: string,
    and?: AndOperator,
    where?: WhereOptions,
    limit?: number | undefined,
    groupby?: GroupOption,
    order?: "ASC" | "DESC",
}