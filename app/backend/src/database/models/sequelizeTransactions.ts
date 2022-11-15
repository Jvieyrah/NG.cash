import { Model, DataTypes } from 'sequelize';
import db from '.';
import accounts from './sequelizeAccounts';

class tansactions extends Model {
  declare id: number;
  declare debitedAccountId: number;
  declare creditedAccountId: number;
  declare value: number;
  declare createdAt: number;
}

tansactions.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  debitedAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
  creditedAccountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id',
    },
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false, // transação não pode ser zero
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
// ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'tansactions',
  tableName: 'tansactions',
  timestamps: false,
});

// workaround de relações
tansactions.hasMany(accounts, { foreignKey: 'id', as: 'debitedAccountId' });
tansactions.hasMany(accounts, { foreignKey: 'id', as: 'creditedAccountId' });

export default tansactions;
