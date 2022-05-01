const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("options", (table) => {
    // fields
    table.text("optionId").notNullable();
    table.text("pollId").notNullable();
    table.text("description").notNullable();

    // primary key
    table.primary(["optionId"]);

    // unique keys
    table.unique(["pollId", "optionId"]);

    // foreign keys
    table
      .foreign(["pollId"])
      .references(["pollId"])
      .inTable("polls")
      .onDelete("no action")
      .onUpdate("no action");
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("options");
};
