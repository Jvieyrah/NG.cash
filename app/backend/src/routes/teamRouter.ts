import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../service/TeamService';

const teamRouter = Router();
const teamService = new TeamService();

const teamCI = new TeamController(teamService);

teamRouter.get('/teams', (req, res) => teamCI.getTeams(req, res));
teamRouter.get('/teams/:id', (req, res) => teamCI.getTeamById(req, res));

export default teamRouter;
