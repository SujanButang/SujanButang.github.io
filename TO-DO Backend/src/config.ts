import dotenv from "dotenv";

dotenv.config();

const config = {
  serverPort: process.env.PORT,
};
export default config;
