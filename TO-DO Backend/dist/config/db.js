import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
const dbConnectionString = process.env.DB_CONNECTION_STRING;
if (!dbConnectionString) {
    console.error("DB_CONNECTION_STRING is not defined in the environment.");
    process.exit(1);
}
const sequelize = new Sequelize(dbConnectionString, {
    dialect: "postgres",
});
export default sequelize;
//# sourceMappingURL=db.js.map