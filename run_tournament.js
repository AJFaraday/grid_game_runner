fs = require('fs');

fs.writeFile(
  'data/matches.csv',
  'Green Name\tGreen Gist\tGreen Score\tRed Name\tRed Gist\tRed Score\tTurns\tResult Type\n'
);
fs.writeFile(
  'data/rankings.csv',
  'Bot\t\Gist\tScore\tOutright\tTimeout\tDraws\tLosses\n'
);


GridGame.init();
Tournament.run_all();
rankings = Object.values(Tournament.rankings);
rankings.sort(function (a, b) {
  return b.score - a.score
});
$.each(
  rankings,
  function (i, ranking) {
    console.log(ranking.bot_name + '\t' + ranking.score);
    fs.appendFile(
      'data/rankings.csv',
      (
        ranking.bot_name + '\t' +
        ranking.bot_gist + '\t' +
        ranking.score + '\t' +
        ranking.outright_wins + '\t' +
        ranking.timeout_wins + '\t' +
        ranking.draws + '\t' +
        ranking.losses + '\n'
      )
    );
  }
);

