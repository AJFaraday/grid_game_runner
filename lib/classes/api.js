GridGame.classes.api = function (player, config) {
  this.player = player;

  this.get_named_bot = function (name) {
    var bot = GridGame.data.bots[name];
    if (bot === undefined) {
      console.log("No known bot named " + name);
    } else {
      this.get_gist(bot);
    }
  };


  this.func = function () {
  };

  this.get_gist = function (id) {
    var api = this;
    if (GridGame.gist_cache[id]) {
      api.implement_code(GridGame.gist_cache[id])
    } else {
      console.log("NOT IN CACHE!!!!!")
    }
  };
  this.implement_code = function (code) {
    this.func = function () {
      var api = this;
      eval(code);
    }.bind(Object.assign({}, this));
    //this.code_field.val(code);
  };
  this.reset = function () {
    this.func = this.func.bind(Object.assign({}, this));
    this.next_move = 0;
  };

  // This point onwards is the public API

  this.towardsX = function () {
    this.player.change_direction(config.towardsX);
  };
  this.east = this.towardsX;

  this.towardsY = function () {
    this.player.change_direction(config.towardsY);
  };
  this.north = this.towardsY;

  this.awayX = function () {
    this.player.change_direction(config.awayX);
  };
  this.west = this.awayX;

  this.awayY = function () {
    this.player.change_direction(config.awayY);
  };
  this.west = this.awayY;

  this.spawning_turn = function () {
    return GridGame.spawning_turn();
  };

  this.random_direction = function () {
    this.player.go_random_direction();
  };

  this.api_turn = function() {
    return GridGame.turn_number;
  };
  this.turn = function() {
    return this.api_turn();
  };

  this.next_move = 0;
  this.wait = function(turns) {
    this.next_move = GridGame.turn_number + turns;
  }

};
