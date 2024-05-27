import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("type_invoice", (table: Knex.TableBuilder) => {
        table.increments("id").primary();
        table.integer("price").notNullable();
        table.string("name").notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("type_invoice")
}

