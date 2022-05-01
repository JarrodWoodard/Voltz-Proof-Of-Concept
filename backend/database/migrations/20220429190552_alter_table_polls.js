const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.alterTable("polls", (table) => {
    table.text("pollType");
  });

  await knex.raw(`
    alter table "polls"
    add constraint "ck_polls_pollType" check ("pollType" in ('USER_VOTES', 'USER_BALANCE'));
  `);

  await knex.from("polls").update({
    pollType: "USER_VOTES",
  });

  await knex.raw(`
    alter table "polls"
    alter column "pollType" set not null;
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.alterTable("polls", (table) => {
    table.dropColumn("pollType");
  });
};
