import matches from '../database/models/sequelizeMatches';
import teams from '../database/models/sequelizeTeams';
import ITeam from '../entities/Iteam.interface';

export default class MatchService {
  private _matchModel: typeof matches;
  private _teamModel: typeof teams;
  constructor() {
    this._matchModel = matches;
    this._teamModel = teams;
  }

  public async getMatches(): Promise<ITeam[]> {
    const allMatches = await this._matchModel.findAll(
      { include: [
        { model: this._teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: this._teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      },
    );
    return allMatches as unknown as ITeam[];
  }
}
