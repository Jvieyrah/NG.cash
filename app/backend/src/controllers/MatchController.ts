import { Request, Response } from 'express';
import MatchService from '../service/MatchService ';
import Imatch from '../entities/IMatch.interface';

export default class MatchController {
  matchService: MatchService;
  constructor(matchService: MatchService) {
    this.matchService = matchService;
  }

  public async getMatchInProgess(inProgress: string | any
  | string[] | any[] | undefined): Promise<Imatch[]> {
    let boolValue = false;
    if (inProgress === 'true') boolValue = true;
    const allMatches = await this.matchService.getMatchInProgess(boolValue);
    return allMatches;
  }

  public async getMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (!inProgress) {
      const allMatches = await this.matchService.getMatches();
      return res.status(200).json(allMatches);
    }

    const progressMatches = await this.getMatchInProgess(inProgress);
    return res.status(200).json(progressMatches);
  }

  public async createMatch(req: Request, res: Response): Promise<Response> {
    const newMatch = await this.matchService.createMatch(req.body);
    return res.status(201).json(newMatch);
  }
}
