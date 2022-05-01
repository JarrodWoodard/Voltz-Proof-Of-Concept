const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.alterTable("polls", (table) => {
    table.decimal("minimalBalanceRequiredToVote", 22, 11);
  });

  await knex.from("polls").update({
    minimalBalanceRequiredToVote: 0,
  });

  await knex.raw(`
    alter table "polls"
    alter column "minimalBalanceRequiredToVote" set not null;
  `);

  await knex.raw(`
    alter table "polls"
    add constraint "ck_polls_minimalBalanceRequiredToVote" check ("minimalBalanceRequiredToVote" >= 0.00000000000);
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.alterTable("polls", (table) => {
    table.dropColumn("minimalBalanceRequiredToVote");
  });
};
