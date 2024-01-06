import { Knex } from 'knex';

const TABLE_NAME = 'todos';

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
       {
        title:"Code",
        completed:true,
        created_by:1
       },
       {
        title:"Sleep",
        completed:false,
        created_by:1
       },
       {
        title:"Drink Coffee",
        completed:true,
        created_by:1
       },
       {
        title:"Go for walking",
        completed:true,
        created_by:1
       },
       {
        title:"Sleep again",
        completed:false,
        created_by:1
       },
      ]);
    });
}