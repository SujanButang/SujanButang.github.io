import { Sequelize } from "sequelize-typescript";

const dbConnectionString = process.env.DB_CONNECTION_STRING;


const sequelize = new Sequelize(dbConnectionString as string, {
  dialect: "postgres",
});

export default sequelize;
