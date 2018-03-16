# tinycrawl-backend
Backend for the tinycrawl phaser game

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

#### Users

Contains user-related data. The only identifier required to select a particular user is the user's uuid, generated by the initial POST request.

Route        | HTTP Verb | Description
-------------|-----------|------------------------------------------------
/users       | **POST**  | Create a new user. Returns the new User object.
/users       | **GET**   | Get a list of all users.
/users/:uuid | **GET**   | Get a single user.

#### Heroes

Contains data about characters created by users.
Route                                   | HTTP Verb | Description
----------------------------------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/heroes                                 | **GET**   | Get a list of all heroes.
/heroes/:uuid                           | **GET**   | Get a single hero.
/heroes/:uuid/traits                    | **GET**   | Get the traits of a single hero.
/heroes/:uuid/traits/:traitname         | **POST**  | Add a trait to a single hero.
/heroes/:heroDefinition/:name/:userUuid | **POST**  | Create a new character by using the `heroDefinition` as a base. The name of the character will be set to `name`. It will be created for the user identified by `userUuid`.
