import { Request, Response } from 'express';
import MatchService from '../service/MatchService ';

export default class MatchController {
  matchService: MatchService;
  constructor(matchService: MatchService) {
    this.matchService = matchService;
  }

  public async getMatches(req: Request, res: Response): Promise<Response> {
    const allMatches = await this.matchService.getMatches();
    return res.status(200).json(allMatches);
  }
}
