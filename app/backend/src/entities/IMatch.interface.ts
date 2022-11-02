import Iteam from './Iteam.interface';

interface Imatch {
  id?: number;
  homeTeam?: number;
  homeTeamGoals: number;
  awayTeam?: number;
  awayTeamGoals: number;
  inProgress?: boolean;
  teamHome?: Iteam;
  teamAway?: Iteam;
}

export default Imatch;
