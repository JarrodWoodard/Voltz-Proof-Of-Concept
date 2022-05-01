const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("votes", (table) => {
    // fields
    table.text("voteId").notNullable();
    table.text("pollId").notNullable();
    table.text("optionId").notNullable();
    table.text("voterAddress").notNullable();
    table.text("payload").notNullable();
    table.text("signature").notNullable();

    // primary key
    table.primary(["voteId"]);

    // foreign keys
    table
      .foreign(["pollId"])
      .references(["pollId"])
      .inTable("polls")
      .onDelete("no action")
      .onUpdate("no action");
    table
      .foreign(["optionId"])
      .references(["optionId"])
      .inTable("options")
      .onDelete("no action")
      .onUpdate("no action");
    table
      .foreign(["pollId", "optionId"])
      .references(["pollId", "optionId"])
      .inTable("options")
      .onDelete("no action")
      .onUpdate("no action");
    table
      .foreign(["voterAddress"])
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
  await knex.schema.dropTable("votes");
};
