import { Request, Response } from 'express';
import LeaderboardService from '../service/LeaderboardService';
// import ILeaderboard from '../entities/Ileaderboard.interface';

export default class LeaderboardController {
  leaderboardService: LeaderboardService;
  constructor(leaderboardService: LeaderboardService) {
    this.leaderboardService = leaderboardService;
  }

  public async getLeaderboardHome(req: Request, res: Response): Promise<Response> {
    const allLeaderboard = await this.leaderboardService.getLeaderboard('homeTeam');
    return res.status(200).json(allLeaderboard);
  }

  public async getLeaderboardAway(req: Request, res: Response): Promise<Response> {
    const allLeaderboard = await this.leaderboardService.getLeaderboard('awayTeam');
    return res.status(200).json(allLeaderboard);
  }
}
