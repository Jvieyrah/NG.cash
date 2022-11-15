// import * as pg from 'pg'
// import { Sequelize } from 'sequelize';
// import * as config from '../config/database';

// const sequelize = new Sequelize('postgres://admin:admin@localhost:5432/mydb', {
//   dialectModule: pg
// });

// export default sequelize;

// export default new Sequelize(config);

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres@localhost:5432/ngcash', {dialect: 'postgres'});
 
export default sequelize;
