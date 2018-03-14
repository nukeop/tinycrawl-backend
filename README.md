# tinycrawl-backend
Backend for the tinycrawl phaser game

## API Endpoints

#### Definitions

Contains definitions of resource types. Think character classes, environment types, weapon components, and so on.

Route                                    | HTTP Verb | Description
-----------------------------------------|-----------|------------------------------------------
/definitions/heroes                      | **GET**   | Get a list of all hero types.
/definitions/heroes/:name                | **GET**   | Get a single hero type.
/definitions/environments                | **GET**   | Get a list of all environments.
/definitions/environments/:name          | **GET**   | Get a single environment.
/definitions/moves                       | **GET**   | Get a list of all moves.
/definitions/moves/:name                 | **GET**   | Get a single move.
/definitions/environmentalFeatures       | **GET**   | Get a list of all environmental features.
/definitions/environmentalFeatures/:name | **GET**   | Get a single environmental feature.
