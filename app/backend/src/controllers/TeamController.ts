import { Request, Response } from 'express';
import TeamService from '../service/TeamService';

export default class TeamController {
  teamService: TeamService;
  constructor(teamService: TeamService) {
    this.teamService = teamService;
  }

  public async getTeams(req: Request, res: Response): Promise<Response> {
    const allTeams = await this.teamService.getTeams();
    return res.status(200).json(allTeams);
  }

  public async getTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await this.teamService.getTeamById(Number(id));
    return res.status(200).json(team);
  }
}
