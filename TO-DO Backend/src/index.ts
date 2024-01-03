import express from "express";
import config from "./config";
import routes from "./routes/index";
import sequelize from "./config/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logger } from "./middlewares/logger";
import {
  genericErrorHandler,
  notFoundError,
} from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
app.use(logger);
app.use("/api", routes);
app.use(genericErrorHandler);
app.use(notFoundError);


app.listen(config.serverPort, async () => {
  await sequelize.sync();

  console.log(`Server started on http://localhost:${config.serverPort}`);
});
