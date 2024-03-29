GridGame.classes.board = function () {
  // Setup

  this.rows = [];

  this.init = function () {
    this.build_table();
    for (var y = 0; y < GridGame.height; y++) {
      this.build_row(y);
    }
    //GridGame.resize.make_grid_fit();
  };

  this.build_table = function () {

  };

  this.build_row = function (y) {
    var board = this;

    var row = [];
    for (var x = 0; x < GridGame.width; x++) {
      var tile = this.build_tile(x, y);
      row.push(tile);
    }
    this.rows.push(row);

  };

  this.build_tile = function (x, y) {
    return new GridGame.classes.tile(x, y);
  };



  // Interface

  this.tile = function (x, y) {
    var row = this.rows[y];
    if (row) {
      return row[x];
    } else {
      return null;
    }
  };

  this.each_tile = function (func) {
    // Sometimes read from the bottom upwards
    //var reverse = (GridGame.turn_number % 3 == 0);
    var reverse = (Math.random() * 2) >= 1;

    if (reverse) {
      for (i = this.rows.length; i >= 0 ; --i) {
        $.each(this.rows[i], function (x, tile) {
          func.call(null, tile);
        })
      }
    } else{
      $.each(this.rows, function (y, row) {
        $.each(row, function (x, tile) {
          func.call(null, tile);
        })
      });
    }

  };

  // TODO maybe move these two to an obstacle placing object
  this.place_n_obstacles = function(flag_name, number) {
    for(var i = number; i > 0; i--){
      this.place_random_obstacle(flag_name);
    }
  };
  
  this.place_random_obstacle = function(flag_name) {
    var x = Math.floor(Math.random() * GridGame.width);
    var y = Math.floor(Math.random() * GridGame.height);
    var tile = this.tile(x, y);
    if (tile.city || tile.rock || tile.wall) {
      this.place_random_obstacle(flag_name);
    } else {
      tile[flag_name] = true;
      tile.value = GridGame[flag_name + '_health'];
    }
  };

};

