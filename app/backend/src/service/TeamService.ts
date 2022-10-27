import teams from '../database/models/sequelizeTeams';
import ITeam from '../entities/Iteam.interface';
import StructuredError from '../errors/StructuredError';

export default class TeamService {
  private _teamModel: typeof teams;
  constructor() {
    this._teamModel = teams;
  }

  public async getTeams(): Promise<ITeam[]> {
    const allTeams = await this._teamModel.findAll();
    return allTeams as unknown as ITeam[];
  }

  public async getTeamById(id: number): Promise<ITeam> {
    const team = await this._teamModel.findOne({ where: { id } });
    if (!team) {
      throw new StructuredError('Team not found', 404);
    }
    return team as unknown as ITeam;
  }
}
