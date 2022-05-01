const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("polls", (table) => {
    // fields
    table.text("pollId").notNullable();
    table.text("title").notNullable();
    table.text("description").notNullable();
    table.text("creatorAddress").notNullable();
    table.text("payload").notNullable();
    table.text("signature").notNullable();

    // primary key
    table.primary(["pollId"]);

    // foreign keys
    table
      .foreign(["creatorAddress"])
      .references(["address"])
      .inTable("users")
      .onDelete("no action")
      .onUpdate("no action");
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("polls");
};
