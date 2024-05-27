import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("type_invoice").del();

    // Inserts seed entries
    await knex("type_invoice").insert([
        { name: 'Listrik PLN', price: 100000},
        { name: 'PDAM', price: 150000 },
        { name: 'Internet', price: 100000 },
        { name: 'TV Kabel', price: 200000 },
        { name: 'Telkom', price: 250000 },
      ]);
};
