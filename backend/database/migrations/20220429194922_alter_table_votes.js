const { Knex } = require("knex");

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.alterTable("votes", (table) => {
    table.decimal("voterBalance", 22, 11);
  });

  await knex.raw(`
    alter table "votes"
    add constraint "ck_votes_voterBalance" check ("voterBalance" >= 0.00000000000);
  `);

  await knex.from("votes").update({
    voterBalance: 0,
  });

  await knex.raw(`
    alter table "votes"
    alter column "voterBalance" set not null;
  `);
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.alterTable("votes", (table) => {
    table.dropColumn("voterBalance");
  });
};
