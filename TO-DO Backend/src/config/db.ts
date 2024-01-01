import { Sequelize } from "sequelize-typescript";

const dbConnectionString = process.env.DB_CONNECTION_STRING;


const sequelize = new Sequelize("postgres://postgres:admin@localhost:5432/TODO", {
  dialect: "postgres",
});

export default sequelize;
