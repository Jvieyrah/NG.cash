import { Model, DataTypes } from 'sequelize';
import db from '.';
import teamModel from './sequelizeTeams';

class matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

matches.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
// ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  tableName: 'matches',
  timestamps: false,
});

/**
* `Workaround` para aplicar as associations em TS:
* Associations 1:N devem ficar em uma das instâncias de modelo
* */

matches.belongsTo(teamModel, { foreignKey: 'homeTeam', as: 'teamHome' });
matches.belongsTo(teamModel, { foreignKey: 'awayTeam', as: 'teamAway' });

// teamModel.hasMany(matches, { foreignKey: 'homeTeam', as: 'homeTeamName' });
// teamModel.hasMany(matches, { foreignKey: 'awayTeam', as: 'awayTeamName' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default matches;
