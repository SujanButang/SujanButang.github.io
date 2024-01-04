import { Knex } from 'knex';

const TABLE_NAME = 'todos';


/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();
    table.string("title",255).notNullable();

    table.boolean("completed").notNullable().defaultTo(false);

    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    
    table
      .bigInteger('created_by')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable("users");
      
    table.timestamp('updated_at').nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}