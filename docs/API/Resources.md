# Resources

This is a list of all resources exposed by the API. Click links to see details.

### Resources

Lists all available resources.

Route | HTTP Verb | Definition
------|-----------|---------------------------------------
/     | **GET**   | Get a list of all available resources.

### [Definitions](Definitions.md)

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

### [Users](Users.md)

Contains user-related data. The only identifier required to select a particular user is the user's uuid, generated by the initial POST request.

Route                  | HTTP Verb  | Description
-----------------------|------------|-------------------------------------------------------------------------------------
/users                 | **POST**   | Create a new user. Returns the new User object.
/users                 | **GET**    | Get a list of all users.
/users/:uuid           | **GET**    | Get a single user.
/users/:uuid           | **DELETE** | Delete a single user.
/users/:uuid/heroes    | **GET**    | Get all heroes of a user.
/users/:uuid/universes | **GET**    | Get all universes of a user.
/users/:uuid/role      | **PUT**    | Update a user's role. Required body parameter: `role`, must be one of allowed roles.