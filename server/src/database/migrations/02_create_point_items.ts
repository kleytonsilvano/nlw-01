import Knex from 'knex';

export async function up(knex: Knex) {
    //Criar tabela
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();
        table.integer('point_id', 255)
            .notNullable()
            .references('id')
            .inTable('points');
        table.integer('item_id', 255)
            .notNullable()
            .references('id')
            .inTable('items');
    })

}

export async function down(knex: Knex) {
    //deletar a tabela ( Rollback) 
    return knex.schema.dropTable('point_items');
}