import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../service/MatchService ';
import authCheck from '../middleware/authCheck';
import fieldCheck from '../middleware/fieldCheck';

const matchFields = ['homeTeam', 'awayTeam'];

const scoreFields = ['homeTeamGoals', 'awayTeamGoals'];

const matchRouter = Router();
const matchService = new MatchService();

const matchCI = new MatchController(matchService);

matchRouter.get('/matches', (req, res) => matchCI.getMatches(req, res));
matchRouter.post('/matches', authCheck, fieldCheck([
  ...matchFields,
  ...scoreFields,
]), (req, res) => matchCI.createMatch(req, res));
matchRouter.patch(
  '/matches/:id',
  authCheck,
  fieldCheck(scoreFields),
  (req, res) => matchCI.updateMatch(req, res),
);

export default matchRouter;
