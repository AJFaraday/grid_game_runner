paths = [
  'lib/external/jquery-3.1.0.min.js',
  'lib/external/cheerio.js',
  'lib/grid_game.js',
  'lib/gist_cache.js',
  'config/game.js',
  'lib/positions.js',
  'config/players.js',
  'config/bots.js',
  'lib/info.js',
  'lib/data/key_maps.js',
  'lib/data/key_display.js',
  'lib/player_components/direction_change.js',
  'lib/turn_phases/mark_movement_phase.js',
  'lib/turn_phases/do_movement_phase.js',
  'lib/turn_phases/mark_damage_phase.js',
  'lib/turn_phases/do_damage_phase.js',
  'lib/classes/tile.js',
  'lib/classes/board.js',
  'lib/classes/player.js',
  'lib/classes/keyboard.js',
  'lib/classes/api.js',
  'lib/api_ui.js',
  'lib/runner/match.js',
  'lib/runner/ranking.js',
  'lib/runner/tournament.js',
  'lib/runner/match_runner.js'
]
command = 'node --harmony '
paths.each do |path|
  command << "-r ./#{path} "
end
command << ' ./run_tournament.js'
system(command)
