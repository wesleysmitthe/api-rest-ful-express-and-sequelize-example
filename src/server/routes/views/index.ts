import { Router, NextFunction, Request, Response } from "express";

const viewRouters = Router();

viewRouters.get("/", (req: Request, res: Response) => {
    res.render("index");
});


export { viewRouters };
