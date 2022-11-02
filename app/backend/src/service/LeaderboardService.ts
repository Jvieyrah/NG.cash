import MatchService from './MatchService ';
// import TeamService from './TeamService';
import ILeaderboard from '../entities/Ileaderboard.interface';
import Imatch from '../entities/IMatch.interface';

type homeOrAway = 'homeTeam' | 'awayTeam';

const getVictories = (team:homeOrAway, match:Imatch[]): number => { // soma os jogos que o time ganhou
  if (team === 'homeTeam') {
    return match.filter((m) => m.homeTeamGoals > m.awayTeamGoals).length;
  }
  return match.filter((m) => m.awayTeamGoals > m.homeTeamGoals).length;
};

const getDefeats = (team:homeOrAway, match:Imatch[]): number => { // soma os jogos que o time perdeu
  if (team === 'homeTeam') {
    return match.filter((m) => m.homeTeamGoals < m.awayTeamGoals).length;
  }
  return match.filter((m) => m.awayTeamGoals < m.homeTeamGoals).length;
};

const getDraws = (match:Imatch[]): number => // soma os jogos que o time empatou
  match.filter((m) => m.homeTeamGoals === m.awayTeamGoals).length;

const getGoalsScored = (team:homeOrAway, match:Imatch[]): number => { // soma os gols que o time fez
  if (team === 'homeTeam') {
    return match.reduce((acc, m) => acc + m.homeTeamGoals, 0);
  }
  return match.reduce((acc, m) => acc + m.awayTeamGoals, 0);
};

const getGoalsConceded = (team:homeOrAway, match:Imatch[]): number => { // soma os gols que o time sofreu
  if (team === 'homeTeam') {
    return match.reduce((acc, m) => acc + m.awayTeamGoals, 0);
  }
  return match.reduce((acc, m) => acc + m.homeTeamGoals, 0);
};

const getGoalDifference = (team:homeOrAway, match:Imatch[]): number => // retorna os gols que o time fez menos os gols que o time sofreu
  getGoalsScored(team, match) - getGoalsConceded(team, match);

const getPoints = (team:homeOrAway, match:Imatch[]): number => // retorna os pontos que o time tem (vitrórias = 3 pontos, empates = 1 ponto, derrotas = 0 pontos)
  getVictories(team, match) * 3 + getDraws(match);

const efficency = (team:homeOrAway, match:Imatch[]): number => // retorna a eficiência do time
  ((getPoints(team, match) / (match.length * 3)) * 100).toFixed(2) as unknown as number;

export default class LeaderboardService {
  private _matchService: MatchService;
  leaderboard: ILeaderboard[];
  matches: Promise<Imatch[]>;

  constructor() {
    this._matchService = new MatchService();
    // this._teamService = new TeamService();
    this.matches = this._matchService.getMatchInProgess(false); // pega só jogos finalizados
    this.leaderboard = [];
  }

  private CaseAwayTeam(matches: Imatch[], team: homeOrAway) {
    const teams = new Set(matches.map((m) => m.awayTeam)); // pega todos os times que jogaram
    this.leaderboard = [...teams].map((t) => ({
      name: matches.find((m) => m.awayTeam === t)?.teamAway?.teamName as string,
      totalPoints: getPoints(team, matches.filter((m) => m.awayTeam === t)),
      totalGames: matches.filter((m) => m.awayTeam === t).length,
      totalVictories: getVictories(team, matches.filter((m) => m.awayTeam === t)),
      totalDraws: getDraws(matches.filter((m) => m.awayTeam === t)),
      totalLosses: getDefeats(team, matches.filter((m) => m.awayTeam === t)),
      goalsFavor: getGoalsScored(team, matches.filter((m) => m.awayTeam === t)),
      goalsOwn: getGoalsConceded(team, matches.filter((m) => m.awayTeam === t)),
      goalsBalance: getGoalDifference(team, matches.filter((m) => m.awayTeam === t)),
      efficiency: efficency(team, matches.filter((m) => m.awayTeam === t)), // chama a função efficency e passa como parâmetro os jogos que o time jogou
    }));
    return this.leaderboard;
  }

  private CaseHomeTeam(matches: Imatch[], team: homeOrAway) {
    const teams = new Set(matches.map((m) => m.homeTeam)); // pega todos os times que jogaram
    this.leaderboard = [...teams].map((t) => ({
      name: matches.find((m) => m.homeTeam === t)?.teamHome?.teamName as string,
      totalPoints: getPoints(team, matches.filter((m) => m.homeTeam === t)),
      totalGames: matches.filter((m) => m.homeTeam === t).length,
      totalVictories: getVictories(team, matches.filter((m) => m.homeTeam === t)),
      totalDraws: getDraws(matches.filter((m) => m.homeTeam === t)),
      totalLosses: getDefeats(team, matches.filter((m) => m.homeTeam === t)),
      goalsFavor: getGoalsScored(team, matches.filter((m) => m.homeTeam === t)),
      goalsOwn: getGoalsConceded(team, matches.filter((m) => m.homeTeam === t)),
      goalsBalance: getGoalDifference(team, matches.filter((m) => m.homeTeam === t)),
      efficiency: efficency(team, matches.filter((m) => m.homeTeam === t)), // chama a função efficency e passa como parâmetro os jogos que o time jogou
    }));
    return this.leaderboard;
  }

  public async getLeaderboard(team:homeOrAway): Promise<ILeaderboard[]> {
    const matches = await this.matches;
    if (team === 'homeTeam') {
      const leaderboard = this.CaseHomeTeam(matches, team);
      return leaderboard.sort((a, b) => b.totalPoints - a.totalPoints); // retorna a tabela de classificação ordenada por pontos
    }
    const leaderboard = this.CaseAwayTeam(matches, team);
    return leaderboard.sort((a, b) => b.totalPoints - a.totalPoints); // retorna a tabela de classificação ordenada por pontos
  }
}
