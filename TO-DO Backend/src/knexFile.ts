import { Knex } from "knex";

import dotenv from "dotenv";

const pathToEnv = __dirname + "/../.env";
dotenv.config({ path: pathToEnv });

export const baseKnexConfig = {
  client: process.env.CLIENT,
  connection: {
    database: process.env.DATABASE,
    host: process.env.HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    user: process.env.USER,
  },
};


const knexConfig: Knex.Config = {
  ...baseKnexConfig,
  migrations: {
    directory: "./database/migrations",
    stub: "./stubs/migration.stub",
    tableName: "migrations",
  },
  seeds: {
    directory: "./database/seeds",
    stub: "./stubs/seed.stub",
  },
};


export default knexConfig;
