import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";

import { IQueryStorage } from "../../../../__interfaces/queryStorageInterface";
import { IDaoSequelizeStorage } from "../../../../__interfaces/daoSequelizeStorageInterface";

const { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR, NOT_FOUND } = StatusCodes;


const StorageMidleware = (storage: IDaoSequelizeStorage<any>) => {
    const storageRouters = Router();

    const handleDatabaseDataMidleware = (req: Request, res: Response, operation: "getList" | "getById" | "create" | "update" | "remove", param: number | IQueryStorage<any> | any) => {
        storage[operation](param)
            .then((data: any) => {
                return res.status(OK).json(data);
            }
            )
            .catch((error: Error) => {
                return res.status(INTERNAL_SERVER_ERROR).json(error);
            })
    }


    storageRouters.get("/", (req: Request, res: Response) => {
        return handleDatabaseDataMidleware(req, res, "getList", req.query);
    });


    storageRouters.get("/:id", (req: Request, res: Response) => {
        if (!!req.params.id) {
            return handleDatabaseDataMidleware(req, res, "getById", parseInt(req.params.id));

        } else {
            return res.status(BAD_REQUEST).json({ message: "id not passed" });
        }
    });


    storageRouters.post("/", (req: Request, res: Response) => {
        if (!!req.body) {
            return handleDatabaseDataMidleware(req, res, "create", req.body);

        } else {
            return res.status(BAD_REQUEST).json({ message: "data not passed" });
        }
    });


    storageRouters.put("/", (req: Request, res: Response) => {
        if (!!req.body) {
            return handleDatabaseDataMidleware(req, res, "update", req.body);

        } else {
            return res.status(BAD_REQUEST).json({ message: "data not passed" });
        }
    });


    storageRouters.delete("/", (req: Request, res: Response) => {
        if (!!req.body) {
            return handleDatabaseDataMidleware(req, res, "remove", req.body);

        } else {
            return res.status(BAD_REQUEST).json({ message: "data not passed" });
        }
    });

    return storageRouters;
}


export { StorageMidleware }