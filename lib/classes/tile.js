GridGame.classes.tile = function (x, y) {

  // Initialise
  this.x = x;
  this.y = y;



  this.player = null;
  this.value = 0;
  this.city = false;
  this.rock = false;
  this.wall = false;
  this.changed = true;

  // used in turn process
  this.value_change = 0;

  GridGame.turn_phases.mark_movement_phase.apply(this);
  GridGame.turn_phases.do_movement_phase.apply(this);
  GridGame.turn_phases.mark_damage_phase.apply(this);
  GridGame.turn_phases.do_damage_phase.apply(this);

  // Utilities

  this.move_target = function () {
    if (this.player) {
      var method_name = 'neighbour_' + this.player.direction;
      return this[method_name]();
    }
  };

  this.neighbours = function () {
    return [
      this.neighbour_north_west(),
      this.neighbour_north(),
      this.neighbour_north_east(),
      this.neighbour_west(),
      this.neighbour_east(),
      this.neighbour_south_west(),
      this.neighbour_south(),
      this.neighbour_south_east()
    ];
  };

  this.neighbour_north_west = function () {
    return GridGame.board.tile(x - 1, y - 1);
  };

  this.neighbour_north = function () {
    return GridGame.board.tile(x, y - 1);
  };

  this.neighbour_north_east = function () {
    return GridGame.board.tile(x + 1, y - 1);
  };

  this.neighbour_west = function () {
    return GridGame.board.tile(x - 1, y);
  };

  this.neighbour_east = function () {
    return GridGame.board.tile(x + 1, y);
  };

  this.neighbour_south_west = function () {
    return GridGame.board.tile(x - 1, y + 1);
  };

  this.neighbour_south = function () {
    return GridGame.board.tile(x, y + 1);
  };

  this.neighbour_south_east = function () {
    return GridGame.board.tile(x + 1, y + 1);
  };

  this.build = function () {


  };



  this.display_character = function () {
    if ((!this.player && !this.wall) || this.value <= 0) {
      return ''
    } else if (this.city) {
      return 'C<small>' + this.value + '</small>';
    }  else if (this.wall) {
      return '<small>' + this.value + '</small>';
    } else {
      return this.value;
    }
  };


};
