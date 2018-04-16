# Overview

## Rules

-   Endpoints are idempotent where it makes sense.
-   Endpoints that modify a resource will return the new modified resource.
-   POST parameters will be passed in body as JSON.

## Authentication

Authentication is done by [basic access authentication](https://en.wikipedia.org/wiki/Basic_access_authentication).
Use the `Authorization` header to provide your username and password. If you provide that data and it corresponds to an existing user, you're authenticated. If you don't, you're not.

The header should contain:
*   the method (currently the only valid value is `Basic`)
*   a single space
*   base64-encoded string containing the username and the password combined with a colon (`username:password`)

Example: `Basic dGVzdDI6dGVzdA==`
