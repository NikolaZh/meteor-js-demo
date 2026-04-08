import { Meteor } from "meteor/meteor";
import { LiveMysqlKeySelector } from "meteor/vlasky:mysql";
import { liveMysql } from "./live-mysql";

export type CustomerListItem = {
    id: number;
    fullName: string;
    position: string;
};

Meteor.publish("customers.list", function () {
    return liveMysql.select(
        `
      SELECT
        c.id AS id,
        c.full_name AS fullName,
        p.title_en AS position
      FROM customers c
      INNER JOIN positions p ON p.id = c.position_id
      ORDER BY c.id ASC
    `,
        null,
        LiveMysqlKeySelector.Index(),
        [
            { table: "customers", database: process.env.MYSQL_DATABASE || "db_demo" },
            { table: "positions", database: process.env.MYSQL_DATABASE || "db_demo" },
        ]
    );
});