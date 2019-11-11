Match = function (green_name, red_name, result_hash, turn) {

  this.green_name = green_name;
  this.green_gist = GridGame.data.bots[green_name];
  this.red_name = red_name;
  this.red_gist = GridGame.data.bots[red_name];

  this.result = result_hash;

  if (result_hash.red == result_hash.green) {
    this.result_type = 'draw'
  } else if (turn >= 3000) {
    this.result_type = 'timeout'
  } else {
    this.result_type = 'outright'
  }

  if (this.result_type == 'draw') {
    this.winner = null;
  } else {
    if (result_hash.red > result_hash.green) {
      this.winner = 'red'
    } else {
      this.winner = 'green'
    }
  }

  this.add_to_csv = function () {
    fs.appendFile(
      'data/matches.csv',
      this.green_name + '\t' +
      this.green_gist + '\t' +
      this.result.green + '\t' +
      this.red_name + '\t' +
      this.red_gist + '\t' +
      this.result.red + '\t' +
      GridGame.turn_number + '\t' +
      this.result_type + '\n'
    );
  };

  this.draw_match = function () {
    console.log('')
    console.log('--------------------------------------------------')
    console.log('match: ' + this.green_name + ' Vs. ' + this.red_name);
    console.log('score: ' + this.result.green + ' - ' + this.result.red);
    console.log('turns: ' + GridGame.turn_number);
    console.log('type: ' + this.result_type);
    console.log('--------------------------------------------------')

  };

  this.update_rankings = function () {
    var green_ranking = Tournament.get_ranking(this.green_name);
    var red_ranking = Tournament.get_ranking(this.red_name);

    if (this.result_type == 'draw') {
      green_ranking.increment(1);
      green_ranking.draws += 1;
      red_ranking.increment(1);
      red_ranking.draws += 1;
    } else {
      var victor;
      if (this.winner == 'green') {
        victor = green_ranking;
        red_ranking.losses += 1;
      } else {
        victor = red_ranking;
        green_ranking.losses += 1;
      }
      if (this.result_type == 'timeout') {
        victor.increment(2);
        victor.timeout_wins += 1;
      } else { // outright win
        victor.increment(3);
        victor.outright_wins += 1;
      }
    }


  };

};