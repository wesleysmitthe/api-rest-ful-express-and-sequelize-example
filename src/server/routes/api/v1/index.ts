import { Router } from "express";
import { StorageMidleware } from "./middlewares";

import { UserDao } from "../../../../_dao/userDao";

const apiRouters = Router();

// storage daos
const userDao = new UserDao();

apiRouters.get("/", function (req, res) {
    res.status(200).json({
        name: "rest_api_express_sequelize_example",
        version: "1.0.0",
        author: "Wesley S. Smitthe",
        date: "XX/11/2020",
    });
});

apiRouters.use("/user", StorageMidleware(userDao));

export { apiRouters };
