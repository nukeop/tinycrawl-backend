# Tinycrawl-backend docs

Tinycrawl is an rpg semi-idle game inspired by [an idea from squidi.net](http://www.squidi.net/three/entry.php?id=22). This project is a backend for the game, that keeps track of all game mechanics and data, and exposes API resources for interaction with possible frontends. This ensures that cheating is impossible, the server is the only source of truth for the game, and the game content is automatically updated for all players everywhere.

The architecture assumes one backend server, and multiple thin frontend clients that run on users' machines.

This project is a work in progress.

*   [API Overview](API/Overview.md)
