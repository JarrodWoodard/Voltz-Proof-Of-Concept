const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    // fields
    table.text("address").notNullable();
    table.text("publicKey").notNullable();

    // primary key
    table.primary(["address"]);
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable("users");
};
