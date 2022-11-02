import MatchService from './MatchService ';
import TeamService from './TeamService';
import ILeaderboard from '../entities/Ileaderboard.interface';
import Imatch from '../entities/IMatch.interface';

const getVictories = (match:Imatch[]): number => // soma os jogos que o time ganhou
  match.filter((m) => m.homeTeamGoals > m.awayTeamGoals).length;

const getDefeats = (match:Imatch[]): number => // soma os jogos que o time perdeu
  match.filter((m) => m.homeTeamGoals < m.awayTeamGoals).length;

const getDraws = (match:Imatch[]): number => // soma os jogos que o time empatou
  match.filter((m) => m.homeTeamGoals === m.awayTeamGoals).length;

const getGoalsScored = (match:Imatch[]): number => // soma os gols que o time fez
  match.reduce((acc, m) => acc + m.homeTeamGoals, 0);

const getGoalsConceded = (match:Imatch[]): number => // soma os gols que o time sofreu
  match.reduce((acc, m) => acc + m.awayTeamGoals, 0);

const getGoalDifference = (match:Imatch[]): number => // retorna os gols que o time fez menos os gols que o time sofreu
  getGoalsScored(match) - getGoalsConceded(match);

const getPoints = (match:Imatch[]): number => // retorna os pontos que o time tem (vitrórias = 3 pontos, empates = 1 ponto, derrotas = 0 pontos)
  getVictories(match) * 3 + getDraws(match);

const efficency = (match:Imatch[]): number => // retorna a eficiência do time
  ((getPoints(match) / (match.length * 3)) * 100).toFixed(2) as unknown as number;

export default class LeaderboardService {
  private _matchService: MatchService;
  private _teamService: TeamService;
  matches: Promise<Imatch[]>;

  constructor() {
    this._matchService = new MatchService();
    this._teamService = new TeamService();
    this.matches = this._matchService.getMatchInProgess(false); // pega só jogos finalizados
  }

  public async getLeaderboard(): Promise<ILeaderboard[]> { // retorna a tabela de classificação
    const matches = await this.matches;
    const teams = new Set(matches.map((m) => m.homeTeam)); // pega todos os times que jogaram
    const leaderboard = [...teams].map((t) => ({ // retorna um array de objetos com os dados de cada time
      name: matches.find((m) => m.homeTeam === t)?.teamHome?.teamName as string,
      totalPoints: getPoints(matches.filter((m) => m.homeTeam === t)), // chama a função getPoints e passa como parâmetro os jogos que o time jogou
      totalGames: matches.filter((m) => m.homeTeam === t || m.awayTeam === t).length, // retorna o total de jogos que o time jogou
      totalVictories: getVictories(matches.filter((m) => m.homeTeam === t)), // chama a função getVictories e passa como parâmetro os jogos que o time jogou
      totalDraws: getDraws(matches.filter((m) => m.homeTeam === t)), // chama a função getDraws e passa como parâmetro os jogos que o time jogou
      totalLosses: getDefeats(matches.filter((m) => m.homeTeam === t)), // chama a função getDefeats e passa como parâmetro os jogos que o time jogou
      goalsFavor: getGoalsScored(matches.filter((m) => m.homeTeam === t)), // chama a função getGoalsScored e passa como parâmetro os jogos que o time jogou
      goalsOwn: getGoalsConceded(matches.filter((m) => m.homeTeam === t)), // chama a função getGoalsConceded e passa como parâmetro os jogos que o time jogou
      goalsBalance: getGoalDifference(matches.filter((m) => m.homeTeam === t)), // chama a função getGoalDifference e passa como parâmetro os jogos que o time jogou
      efficiency: efficency(matches.filter((m) => m.homeTeam === t)), // chama a função efficency e passa como parâmetro os jogos que o time jogou
    }));
    return leaderboard.sort((a, b) => b.totalPoints - a.totalPoints); // retorna a tabela de classificação ordenada por pontos
  }
}
