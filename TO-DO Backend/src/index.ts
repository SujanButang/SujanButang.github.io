import express from "express";
import config from "./config";
import routes from "./routes/index";
import sequelize from "./config/db";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());

app.use("/api", routes);

app.listen(config.serverPort, async () => {
  await sequelize.sync();

  console.log(`Server started on http://localhost:${config.serverPort}`);
});
