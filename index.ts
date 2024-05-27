import express, { Express, Request, Response } from "express";
import knex from "knex";
import { Model } from "objection";
import router from "./src/routes";
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ||  3000;

const knexInstance = knex({
  client: "postgres",
  connection: process.env.DATABASE_URL
});

Model.knex(knexInstance);

console.log(port, ' ', process.env.DATABASE_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
