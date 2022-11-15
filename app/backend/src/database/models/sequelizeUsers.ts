import { Model, DataTypes } from 'sequelize';
import db from '.';
import accounts from './sequelizeAccounts';

class users extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare accountId: number;
}

users.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id',
    },
   
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'users',
  tableName: 'users',
  timestamps: false,
});

// workaround de relações
users.hasOne(accounts, { foreignKey: 'id', as: 'accountID' });

export default users;
