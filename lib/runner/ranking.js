Ranking = function (bot_name) {
  this.bot_name = bot_name;
  this.bot_gist = GridGame.data.bots[bot_name];

  this.score = 0;
  this.outright_wins = 0;
  this.timeout_wins = 0;
  this.draws = 0;
  this.losses = 0;

  this.increment =function(n) {
    this.score += n;
  }
};
