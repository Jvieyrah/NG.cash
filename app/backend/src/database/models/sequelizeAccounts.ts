import { Model, DataTypes } from 'sequelize';
import db from '.';
import tansactions from './sequelizeTransactions';

class accounts extends Model {
// id: number {
//   type: DataTypes.INTEGER,
// }
  declare id: number;
  declare balance: number;
}

accounts.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2), // a inteção é que so valores monetários sejam inseriveis.
    allowNull: true, // a intenção é que o valor possa ser zero
  },
}, {
// ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'accounts',
  tableName: 'accounts',
  timestamps: false,
});

// workaround de relações
accounts.hasMany(tansactions, { foreignKey: 'id', as: 'debitedAccountId' });
accounts.hasMany(tansactions, { foreignKey: 'id', as: 'creditedAccountId' });

export default accounts;
