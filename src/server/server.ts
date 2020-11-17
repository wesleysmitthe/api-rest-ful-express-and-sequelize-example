import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";

import express, { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import "express-async-errors";

// import * as Sentry from "@sentry/node";
import logger from "../utils/Logger";
import { apiRouters } from "./routes/api/v1";
import { viewRouters } from "./routes/views";

const { BAD_REQUEST } = StatusCodes;

const app = express();

// Sentry.init({ dsn: "https://8966eb8d0dda43e9adff7f904a5a1c3e@o473262.ingest.sentry.io/5508033" });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.errorHandler());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
    app.use(helmet());
}

const viewsDir = path.join(__dirname, "../", "views");
const staticDir = path.join(__dirname, "../", "public");

app.use("/", viewRouters)
app.set("views", viewsDir);
app.set("view engine", "pug");
app.use("/api/v1/", apiRouters);
app.use(express.static(staticDir));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});


export default app;
