import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      username: "admin",
      password: await bcrypt.hash("admin", 10),
      role: "admin",
    },
    {
      username: "customer1",
      password: await bcrypt.hash("password", 10),
      role: "customer",
    },
    {
      username: "customer2",
      password: await bcrypt.hash("password", 10),
      role: "customer",
    },
    {
      username: "customer3",
      password: await bcrypt.hash("password", 10),
      role: "customer",
    },
  ]);
}
