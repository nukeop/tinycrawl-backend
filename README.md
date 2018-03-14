# tinycrawl-backend
Backend for the tinycrawl phaser game

## API Endpoints

#### Definitions

Contains definitions of resource types. Think character classes, biome types, weapon components, and so on.
Route                          | HTTP Verb | Description
:------------------------------|:----------|:----------------------------------------
/definitions/heroes            | **GET**       | Get a list of all hero types.
/definitions/heroes:name       | **GET**       | Get a single hero type.
/definitions/environments      | **GET**       | Get a list of all environments (biomes).
/definitions/environments:name | **GET**       | Get a single environment.
