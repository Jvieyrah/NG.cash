import matches from '../database/models/sequelizeMatches';
import teams from '../database/models/sequelizeTeams';
import Imatch from '../entities/IMatch.interface';
import StructuredError from '../errors/StructuredError';

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

  public async createMatch(newMatch: Imatch): Promise<Imatch> {
    const { homeTeam, awayTeam } = newMatch;
    if (homeTeam === awayTeam) {
      throw new StructuredError('It is not possible to create a match with two equal teams', 422);
    }
    const isTeamHome = await this._teamModel.findOne({ where: { id: homeTeam } });
    const isTeamAway = await this._teamModel.findOne({ where: { id: awayTeam } });
    if (!isTeamHome || !isTeamAway) {
      throw new StructuredError('There is no team with such id!', 404);
    }
    const newMatchInProgress = { ...newMatch, inProgress: true };
    const match = await this._matchModel.create(newMatchInProgress);
    return match as unknown as Imatch;
  }

  public async updateMatch(updatedMatch: Imatch, id: string): Promise<Imatch> {
    const match = await this._matchModel.update(updatedMatch, { where: { id } });
    if (!match[0]) {
      throw new StructuredError('There is no match with such id!', 404);
    }
    const updatedMatchInProgress = this._matchModel.findOne({ where: { id } });
    return updatedMatchInProgress as unknown as Imatch;
  }
}
