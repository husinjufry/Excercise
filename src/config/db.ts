import { DataSource } from "typeorm";
import { User } from "../models/user.model";
import dotenv from 'dotenv';

dotenv.config();

export const Database = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});