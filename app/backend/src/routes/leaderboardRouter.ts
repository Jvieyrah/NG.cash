import { Router } from 'express';
import LeaderboardService from '../service/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();
const leaderboardService = new LeaderboardService();
const leaderboardCI = new LeaderboardController(leaderboardService);

leaderboardRouter.get('/leaderboard/home', (req, res) => leaderboardCI.getLeaderboard(req, res));

export default leaderboardRouter;
