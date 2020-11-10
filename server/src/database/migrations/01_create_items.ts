import Knex from 'knex';

export async function up(knex: Knex) {
    //Criar tabela
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image', 255).notNullable();
        table.string('title', 255).notNullable();
    })

}

export async function down(knex: Knex) {
    //deletar a tabela ( Rollback) 
    return knex.schema.dropTable('items');
}