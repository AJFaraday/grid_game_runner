# Grid Game Runner

*Disclimer:* This is quickly written, badly butchered, horribly put together code. Everything here is presented 'as is' 
and it is rubbish. I'm using ruby scripts to load a whole load of JS files, and the world hasn't burned yet.

Scripts:

Get the gists from Github, as defined in /config/bots.js

```
ruby rebuild_cache.rb
```
 
Run a tournament 
 
 ```
 ruby run_tournament.rb
 ```
 
 Build HTML display pages in /html (this one actually uses ruby)
 
 ```
 ruby display_tournament.rb
 ```
 
 
 ---
 
 Minimal case for current error
 
```
ruby test.rb
```
 
In this case, we expect 'orbit' vs 'CBC goes with everything' to score 19 - 0, but it instead scores 18 - 0.

We're looking for some variable escaping from one match to another.
 
 