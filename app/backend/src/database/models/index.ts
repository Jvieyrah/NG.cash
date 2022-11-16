// import * as pg from 'pg'
import { Sequelize } from 'sequelize';
import * as postgres from 'pg';
// import 'dotenv/config';
// import { Options } from 'sequelize';
// import * as config from '../config/database';

// const config: Options = {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     dialect: 'postgres',
//     dialectModule: pg,
//     dialectOptions: {
//         timezone: 'Z',
//     },
//     logging: false,
// }

// const sequelize = new Sequelize(config);

const sequelize = new Sequelize('postgres://admin:admin@localhost:5432/ngcash', {
    dialect: 'postgres',
 });

// export default sequelize;

// export default new Sequelize(config);


// const sequelize = new Sequelize('postgres://postgres@localhost:5432/ngcash', {dialect: 'postgres'});
 
export default sequelize;
