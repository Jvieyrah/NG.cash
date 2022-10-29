import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import MatchService from '../service/MatchService ';

const matchRouter = Router();
const matchService = new MatchService();

const matchCI = new MatchController(matchService);

matchRouter.get('/matches', (req, res) => matchCI.getMatches(req, res));

export default matchRouter;
