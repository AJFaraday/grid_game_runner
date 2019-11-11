GridGame = {

  // Initialise
  classes: {},
  data: {},
  turn_phases: {},
  player_components: {},
  resize: {},
  bot_actions: [],

  init: function (data) {
    if (typeof data != 'undefined') {
      GridGame.init_data = data;
      GridGame.data.game = Object.assign(GridGame.data.game, data);
      Players.init();
      GridGame.tournament = data.tournament;
    } else {
      GridGame.init_data = data;
      this.tournament = false;
    }

    this.width = GridGame.data.game.width;
    this.height = GridGame.data.game.height;
    this.spawn_interval = GridGame.data.game.spawn_interval;

    this.city_conversion_size = GridGame.data.game.city_conversion_size;
    this.rock_count = GridGame.data.game.rock_count;
    this.wall_count = GridGame.data.game.wall_count;

    this.game_space = $('#grid_game');

    this.turn_number = 0;

    this.init_dom();
    this.init_board();
    this.init_players();
    this.init_obstacles();
    this.init_keyboard();


    this.focus_board();

    GistCache.init();
  },

  focus_board: function () {
    //this.game_space.focus();
  },

  init_dom: function () {
    this.player_panels = $('<div>');
    this.player_panels.attr('id', 'player_panels')
    this.game_space.append(this.player_panels);
  },

  init_players: function () {
    if (this.players === undefined) {
      this.players = [];
      $.each(
        GridGame.data.players,
        function (index, player_config) {
          if (this.players === undefined) {
            player = new GridGame.classes.player(player_config);
            GridGame.players.push(player);
          }
          player.init();
        }
      )
    } else {
      $.each(
        GridGame.players,
        function (i, player) {
          player.build_first_city();
          player.still_alive = true;
          player.dead = false;
        }
      )
    }
  },

  init_board: function () {
    this.board = new GridGame.classes.board();
    this.board.init();
  },

  init_keyboard: function () {
    this.keyboard = new GridGame.classes.keyboard();
    this.keyboard.init();
  },

  init_obstacles: function () {
    this.board.place_n_obstacles('rock', this.rock_count);
    this.board.place_n_obstacles('wall', this.wall_count);
  },

  // Operation

  run_whole: function () {
    GridGame.active = true;
    for (let i = 0; i < 3000; ++i) {
      if (GridGame.active) {
        GridGame.turn();
      }
    }
    if (GridGame.active) {
      GridGame.end_game();
    }
  },



  turn_active: false,
  callbacks: [],

  turn: function () {
    $.each(GridGame.apis, function (i, api) {
      if (GridGame.turn_number >= api.next_move) {
        api.func()
      }
    });
    GridGame.set_players_dead();

    GridGame.board.each_tile(function (tile) {
      tile.mark_damage_phase();
    });
    GridGame.board.each_tile(function (tile) {
      tile.do_damage_phase();
    });
    GridGame.board.each_tile(function (tile) {
      tile.mark_movement_phase();
    });
    GridGame.board.each_tile(function (tile) {
      tile.do_movement_phase();
    });

    GridGame.check_players_alive();
    GridGame.turn_number += 1;
    $.each(GridGame.callbacks, function (i, c) {
      c()
    })
  },

  spawning_turn: function () {
    return (this.turn_number % this.spawn_interval == 0);
  },

  // All are marked dead at the start of the turn
  // During mark_movement_phase, they are marked still_alive, if they have tiles.
  // At the end of the turn, kill off players who have no tiles.
  set_players_dead: function () {
    $.each(
      this.players,
      function (i, player) {
        player.still_alive = false;
      }
    )
  },

  check_players_alive: function () {
    $.each(
      this.players,
      function (i, player) {
        if (!player.still_alive) {
          player.dead = true;
        }
      }
    );
    if (this.living_players().length <= 1) {
      GridGame.end_game();
    }
  },

  living_players: function () {
    var result = [];
    $.each(
      this.players,
      function (i, player) {
        if (!player.dead) {
          result.push(player)
        }
      }
    );
    return result;
  },

  ending_callbacks: [],
  end_game: function () {
    $.each(GridGame.ending_callbacks, function (i, c) {
      c()
    });
    GridGame.active = false;
  },

  reset: function () {
    this.init(GridGame.init_data);
  },
  gist_cache: {}
};

