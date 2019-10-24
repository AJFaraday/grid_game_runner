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
  this.title =   this.green_name + ' Vs. ' + this.red_name



  this.run = function () {
    var runner = this;
    GridGame.reset();
    GridGame.turn_time = 0;
    GridGame.ending_callbacks = [];
    GridGame.ending_callbacks.push(
      function () {
        runner.finish(runner);
      }
    );
    $('#current_match').html(this.title);
    GridGame.start();
  };

  var display_match = function(result, runner) {
    console.log(runner.green_name + ': ' + result.green)
    console.log(runner.red_name + ': ' + result.red)
    var row = $('<tr>')
    row.append($('<td>').html(runner.green_name));
    row.append($('<td>').html(result.green + ' - ' + result.red));
    row.append($('<td>').html(runner.red_name));
    $('tbody#scores_body').append(row);
  };

  this.finish = function (runner) {
    console.log('match runner ending func')
    var result = GridGame.info.get_overall_health();
    display_match(result, runner);
  }

};

/*
r = new MatchRunner(
  '808c86eb544d9efaf94a30efc91bdfaf', // all towards
  'd9eb9a70ad0dc0fb1885be0fce032adc' // faraday cage
)
r.run()
 */
