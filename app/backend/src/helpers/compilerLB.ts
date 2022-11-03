import ILeaderboard from '../entities/Ileaderboard.interface';

function compiler(homeTeam: ILeaderboard, awayTeam: ILeaderboard) {
  const cp = { name: homeTeam.name,
    totalPoints: homeTeam.totalPoints + awayTeam.totalPoints,
    totalGames: homeTeam.totalGames + awayTeam.totalGames,
    totalVictories: homeTeam.totalVictories + awayTeam.totalVictories,
    totalDraws: homeTeam.totalDraws + awayTeam.totalDraws,
    totalLosses: homeTeam.totalLosses + awayTeam.totalLosses,
    goalsFavor: homeTeam.goalsFavor + awayTeam.goalsFavor,
    goalsOwn: homeTeam.goalsOwn + awayTeam.goalsOwn,
    goalsBalance: homeTeam.goalsBalance + awayTeam.goalsBalance,
    efficiency: 0,
  };
  cp.efficiency = parseFloat(
    ((cp.totalPoints / (cp.totalGames * 3)) * 100).toFixed(2),
  );
  return cp;
}

export default function compiledLeaderboards(
  homeTeamLb: ILeaderboard[],
  awayTeamLb: ILeaderboard[],
) {
  const leaderboard: ILeaderboard[] = [];
  for (let i = 0; i < homeTeamLb.length; i += 1) {
    for (let j = 0; j < awayTeamLb.length; j += 1) {
      const homeTeam = homeTeamLb[i];
      const awayTeam = awayTeamLb[j];
      if (homeTeam.name === awayTeam.name) {
        const teamPerformance = compiler(homeTeam, awayTeam);
        leaderboard.push(teamPerformance);
      }
    }
  }
  return leaderboard;
}
