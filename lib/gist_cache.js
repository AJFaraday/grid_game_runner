GistCache = {

  init: function () {

  },


  // TODO do this without jquery
  rebuild: function () {
    fs = require('fs');
    GridGame.gist_cache = {}
    var XMLHttpRequest = require("xhr2");
    GridGame.gist_cache = {};
    n = 0;
    $.each(
      GridGame.data.bots,
      function (name, gist_id) {
        var request = new XMLHttpRequest();
        request.open('GET', ('https://api.github.com/gists/' + gist_id), true);
        request.onload = function () {
          try {
            var data = JSON.parse(this.response);
            var code = data.files['bot.js'].content;
            GridGame.gist_cache[gist_id] = code;
            console.log(gist_id + ' imported');
            n += 1;
            console.log(n)
            if (n == Object.keys(GridGame.data.bots).length) {
              // console.log(GridGame.gist_cache);
              // todo
              GistCache.write_to_file();
            }
          } catch (error) {
            console.log('------------------------------------');
            console.log(error)
            console.log(this.response);
            console.log(new Date())
            console.log('------------------------------------');
            throw('RATE LIMIT REACHED (poop)')
          }
        };
        request.send();
      }
    );
  },

  write_to_file: function() {
    var initialize_text = 'GridGame.gist_cache = ' + JSON.stringify(GridGame.gist_cache);
    fs.writeFile(
      'data/init_gist_cache.js',
      initialize_text
    )
  }
};
