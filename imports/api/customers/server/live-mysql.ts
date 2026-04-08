import { LiveMysql } from "meteor/vlasky:mysql";

const {
    MYSQL_HOST = "mysql",
    MYSQL_PORT = "3306",
    MYSQL_DATABASE = "db_demo",
    MYSQL_USER = "meteor",
    MYSQL_PASSWORD = "meteor",
} = process.env;

export const liveMysql = new LiveMysql({
    host: MYSQL_HOST,
    port: Number(MYSQL_PORT),
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    serverId: 1,
    minInterval: 300,
});

const closeLiveMysql = (): void => {
    liveMysql.end();
    process.exit();
};

process.on("SIGTERM", closeLiveMysql);
process.on("SIGINT", closeLiveMysql);