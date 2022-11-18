import 'dotenv/config';
import { Options } from 'sequelize';
import * as pg from 'pg';

const config: Options = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

export default config;
