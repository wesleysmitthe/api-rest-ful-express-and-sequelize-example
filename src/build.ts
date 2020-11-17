import fs from "fs-extra";
import Logger from "jet-logger";


try {
    fs.removeSync("./dist/");
    fs.copySync("./src/public", "./dist/public");
    fs.copySync("./src/views", "./dist/views");
    fs.copySync("./src/config", "./dist/config");

} catch (err) {
    Logger.Err(err);
}
