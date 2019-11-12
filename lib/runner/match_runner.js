MatchRunner = function (green_gist, red_gist) {

  GridGame.players[0].api.get_gist(green_gist);
  GridGame.players[1].api.get_gist(red_gist);

  var get_bot_name = function (gist) {
    var found_name = null;
    $.each(
      GridGame.data.bots,
      function (name, gist_id) {
        if (gist_id == gist) {
          found_name = name;
        }
      }
    );
    return found_name;
  };

  this.green_name = get_bot_name(green_gist);
  this.red_name = get_bot_name(red_gist);


  this.run = function () {
    if (!green_gist || !red_gist) {
      return
    }
    var runner = this;
    GridGame.reset();
    GridGame.ending_callbacks = [];
    GridGame.ending_callbacks.push(
      function () {
        runner.finish(runner);
      }
    );
    GridGame.run_whole();
  };



  this.finish = function (runner) {
    Tournament.matches_played += 1;
    var result = GridGame.info.get_overall_health();
    var match = new Match(
      runner.green_name,
      runner.red_name,
      result,
      GridGame.turn_number
    );
    fs.appendFile(
      'data/movelog.txt',
      green_gist+': '+GridGame.players[0].movelog+'\n'+
      red_gist+': '+GridGame.players[1].movelog+'\n'
    );
    match.draw_match();
    match.add_to_csv();
    match.update_rankings();
  }

};

