import { Response } from "supertest";
import { IUser } from "src/_dao/_MER/User";


export interface IResponse extends Response {
    body: {
        users: IUser[];
        error: string;
    };
}

export interface IReqBody {
    user?: IUser;
}
