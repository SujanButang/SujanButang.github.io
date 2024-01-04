import dotenv from "dotenv";

const pathToEnv = __dirname + "/../.env";
dotenv.config({ path: pathToEnv });

const config = {
  serverPort: process.env.PORT,
};
export default config;
