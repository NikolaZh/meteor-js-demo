import "reflect-metadata";
import { DataSource } from "typeorm";
import { Customer } from "./entities/Customer";
import { Position } from "./entities/Position";
import { Translation } from "./entities/Translation";

const {
  MYSQL_HOST = "mysql",
  MYSQL_PORT = "3306",
  MYSQL_DATABASE = "babelshark",
  MYSQL_USER = "meteor",
  MYSQL_PASSWORD = "meteor",
} = process.env;

export const AppDataSource = new DataSource({
  type: "mysql",
  connectorPackage: "mysql2",
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  entities: [Customer, Position, Translation],
  synchronize: true,
  logging: ["error", "schema"],
});