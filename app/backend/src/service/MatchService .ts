import matches from '../database/models/sequelizeMatches';
import teams from '../database/models/sequelizeTeams';
import Imatch from '../entities/IMatch.interface';

export default class MatchService {
  private _matchModel: typeof matches;
  private _teamModel: typeof teams;
  constructor() {
    this._matchModel = matches;
    this._teamModel = teams;
  }

  public async getMatches(): Promise<Imatch[]> {
    const allMatches = await this._matchModel.findAll(
      { include: [
        { model: this._teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: this._teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      },
    );
    return allMatches as unknown as Imatch[];
  }

  public async getMatchInProgess(Query:boolean): Promise<Imatch[]> {
    const allMatches = await this._matchModel.findAll(
      { where: { inProgress: Query },
        include: [
          { model: this._teamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: this._teamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      },
    );
    return allMatches as unknown as Imatch[];
  }
}
