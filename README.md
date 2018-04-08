# tinycrawl-backend [![Codeship Status for nukeop/tinycrawl-backend](https://img.shields.io/codeship/7d85d430-0a8d-0136-3fd1-669fed979da3/master.svg?style=for-the-badge)](https://app.codeship.com/projects/281672)
Backend for the tinycrawl phaser game

## Rules

-   Endpoints are idempotent where it makes sense.
-   Endpoints that modify a resource will return the new modified resource.
-   POST parameters will be passed in body as JSON.

## Authentication

Authentication is done by [basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).
Use the `Authorization` header to provide your username and password. If you provide that data and it corresponds to an existing user, you're authenticated. If you don't, you're not.

The header should contain:
* the method (currently the only valid value is `Basic`)
* a single space
* base64-encoded string containing the username and the password combined with a colon (`username:password`)

Example: `Basic dGVzdDI6dGVzdA==`

## API Endpoints

#### Resources

Lists all available resources.

Route | HTTP Verb | Definition
------|-----------|---------------------------------------
/     | **GET**   | Get a list of all available resources.

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
/definitions/abilities                   | **GET**   | Get a list of all abilities.
/definitions/abilities/:name             | **GET**   | Get a single ability.

#### Users

Contains user-related data. The only identifier required to select a particular user is the user's uuid, generated by the initial POST request.

Route                  | HTTP Verb  | Description
-----------------------|------------|------------------------------------------------
/users                 | **POST**   | Create a new user. Returns the new User object.
/users                 | **GET**    | Get a list of all users.
/users/:uuid           | **GET**    | Get a single user.
/users/:uuid           | **DELETE** | Delete a single user.
/users/:uuid/heroes    | **GET**    | Get all heroes of a user.
/users/:uuid/universes | **GET**    | Get all universes of a user.

#### Heroes

Contains data about characters created by users.

Route                           | HTTP Verb  | Description
--------------------------------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/heroes                         | **GET**    | Get a list of all heroes.
/heroes                         | **POST**   | Create a new character by using the `heroDefinition` as a base. The name of the character will be set to `name`. It will be created for the user identified by `userUuid`.
/heroes/:uuid                   | **GET**    | Get a single hero.
/heroes/:uuid                   | **DELETE** | Delete a single hero.
/heroes/:uuid/traits            | **GET**    | Get the traits of a single hero.
/heroes/:uuid/traits/:traitname | **POST**   | Add a trait to a single hero.
/heroes/:uuid/traits/:traitname | **DELETE** | Delete a trait from a single hero.
/heroes/:uuid/moves             | **GET**    | Get the moves of a single hero.
/heroes/:uuid/moves/:movename   | **POST**   | Add a move to a single hero.
/heroes/:uuid/moves/:movename   | **DELETE** | Delete a move from a single hero.

#### Universes

Contains data about game universes (separate worlds).

Route                    | HTTP Verb  | Description
-------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------
/universes               | **GET**    | Get a list of all universes.
/universes               | **POST**   | Create a new universe. `userUuid` is a required parameter and must correspond to an existing user, the universe will be created for that user.
/universes/:uuid         | **GET**    | Get a single universe.
/universes/:uuid         | **DELETE** | Delete a single universe.
/universes/:uuid/markers | **GET**    | Return all markers within the universe.

#### Markers

Markers are points of interest in a universe, such as stars, planets, stations, etc.

Route          | HTTP Verb | Description
---------------|-----------|---------------------------------------------------------------------------------------------------------------------
/markers       | **GET**   | Get a list of all markers.
/markers/:uuid | **POST**  | Get a single marker.
/markers       | **POST**  | Create a new marker. Required parameters: `universeUuid`, `name`, `type`. Type can be either a `star` or a `planet`. Optional parameter: `parentMarker`. This should be a uuid pointing to a marker that this marker orbits.
