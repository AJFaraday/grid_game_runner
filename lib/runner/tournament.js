Tournament = {
  matches_played: 0,
  rankings: {},

  active: true,
  num_bots: Object.keys(GridGame.data.bots).length,
  gists: Object.values(GridGame.data.bots),
  current_index: 0,
  oponent_index: 0,
  active: true,
  run_all: function () {
    var current_match = Tournament.next_match();
    while(Tournament.active) {
      Tournament.run_match(current_match.green, current_match.red);
      current_match = Tournament.next_match();
    }
  },
  

  next_match: function () {
    // next opponent
    this.oponent_index += 1;
    // if there's no more opponents left
    if (this.oponent_index >= this.num_bots) {
      this.current_index += 1;
      this.oponent_index = this.current_index + 1;
    }
    // if there's no more bots left
    if (this.current_index >= this.num_bots) {
      this.active = false;
    }
    return {
      green: this.gists[this.current_index],
      red: this.gists[this.oponent_index]
    }
  },

  run_match: function (green_gist, red_gist) {
    GridGame.init();
    new MatchRunner(green_gist, red_gist).run();
  },

  get_ranking: function (bot_name) {
    if (Tournament.rankings[bot_name]) {
      return Tournament.rankings[bot_name];
    } else {
      Tournament.rankings[bot_name] = new Ranking(bot_name);
      return Tournament.rankings[bot_name];
    }
  },

  

};