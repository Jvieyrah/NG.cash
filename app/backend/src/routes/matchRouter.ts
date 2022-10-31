import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../service/MatchService ';
import authCheck from '../middleware/authCheck';
import fieldCheck from '../middleware/fieldCheck';

const matchRouter = Router();
const matchService = new MatchService();

const matchCI = new MatchController(matchService);

matchRouter.get('/matches', (req, res) => matchCI.getMatches(req, res));
matchRouter.post('/matches', authCheck, fieldCheck, (req, res) => matchCI.createMatch(req, res));

export default matchRouter;
