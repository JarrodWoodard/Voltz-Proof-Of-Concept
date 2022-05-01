const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.alterTable("polls", (table) => {
    table.boolean("expired");
    table.dateTime("expirationDate");
    table.integer("expirationBlockQuote");
  });

  await knex.from("polls").update({
    expired: false,
  });

  await knex.raw(`
    alter table "polls"
    alter column "expired" set not null;
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.alterTable("polls", (table) => {
    table.dropColumn("expired");
    table.dropColumn("expirationDate");
    table.dropColumn("expirationBlockQuote");
  });
};
