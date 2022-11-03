import { Router } from 'express';
import LeaderboardService from '../service/LeaderboardService';
import LeaderboardController from '../controllers/LeaderboardController';

const lbRouter = Router();
const leaderboardService = new LeaderboardService();
const leaderboardCI = new LeaderboardController(leaderboardService);

lbRouter.get('/leaderboard/home', (req, res) => leaderboardCI.getLeaderboardHome(req, res));
lbRouter.get('/leaderboard/away', (req, res) => leaderboardCI.getLeaderboardAway(req, res));
lbRouter.get('/leaderboard', (req, res) => leaderboardCI.getLeaderboard(req, res));

export default lbRouter;
