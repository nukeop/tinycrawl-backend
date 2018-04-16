# Definitions

## /definitions/heroes
Returns a list of all hero types.

##### URL

    /definitions/heroes

##### Method

    GET

##### URL Params

    None.

##### Body Params

    None.

##### Success response

###### HTTP Code

    200

###### Content

Key    | Type  | Description
:------|:------|:----------------------------------------------
heroes | Array | An array containing all hero type definitions.

##### Error response

    None.

##### Sample call

```javascript
fetch('https://tinycrawl-backend.glitch.me/definitions/heroes')
.then(response => response.json)
.then(data => {
  console.log(data);
});
```

##### Sample response

```json
{
  "heroes": [
    {
      "name": "marine",
      "prettyName": "Marine",
      "startingStats": {
        "baseHp": 3,
        "attack": 2,
        "defense": 1
      },
      "slots": [
        "suit",
        "external_suit",
        "headgear",
        "weapon",
        "accessory"
      ],
      "moves": [
        "hollow_point",
        "supply_drop",
        "rapid_fire",
        "combat_nanobots"
      ],
      "abilities": [
        "targeting_computer",
        "alloy_armor"
      ],
      "unlock_condition": null
    },
    {
      "name": "mutant",
      "prettyName": "Mutant",
      "startingStats": {
        "baseHp": 7,
        "attack": 0,
        "defense": 0
      },
      "slots": [
        "weapon",
        "weapon",
        "weapon"
      ],
      "moves": [
        "radiation_pulse",
        "nuclear_decay",
        "fission",
        "half_life"
      ],
      "abilities": [
        "radiation_resistant",
        "quantum_immortality"
      ],
      "unlock_condition": "hero.mutations > 0"
    },
    {
      "name": "pirate",
      "prettyName": "Space Pirate",
      "startingStats": {
        "baseHp": 2,
        "attack": 2,
        "defense": 3
      },
      "slots": [
        "suit",
        "external_suit",
        "headgear",
        "weapon"
      ],
      "moves": [
        "napalm",
        "twin_missile",
        "delayed_stab",
        "assassination"
      ],
      "abilities": [],
      "unlock_condition": null
    },
    {
      "name": "hacker",
      "prettyName": "Hacker",
      "startingStats": {
        "baseHp": 2,
        "attack": 1,
        "defense": 1
      },
      "slots": [
        "suit",
        "external_suit",
        "headgear",
        "accessory",
        "accessory"
      ],
      "moves": [],
      "abilities": [],
      "unlock_condition": null
    }
  ]
}
```


## /definitions/heroes/:name
Get a single hero type.

##### URL

    /definitions/heroes:name

##### Method

    GET

##### URL Params

Param | Required? | Type   | Description
:-----|:----------|:-------|:-----------------------------
name  | true      | string | Name of the hero type to get.

##### Body Params

    None.

##### Success response

###### HTTP Code

    200

###### Content

Key    | Type  | Description
:------|:------|:------------------------------------------------------------------------------------------
heroes | Array | An array containing all hero type definitions whose name matches the URL parameter `name`.

##### Error response

    None.

##### Sample call

```javascript
fetch('https://tinycrawl-backend.glitch.me/definitions/heroes/marine')
.then(response => response.json)
.then(data => {
  console.log(data);
});
```

##### Sample response

```json
{
  "heroes": [
    {
      "name": "marine",
      "prettyName": "Marine",
      "startingStats": {
        "baseHp": 3,
        "attack": 2,
        "defense": 1
      },
      "slots": [
        "suit",
        "external_suit",
        "headgear",
        "weapon",
        "accessory"
      ],
      "moves": [
        "hollow_point",
        "supply_drop",
        "rapid_fire",
        "combat_nanobots"
      ],
      "abilities": [
        "targeting_computer",
        "alloy_armor"
      ],
      "unlock_condition": null
    }
  ]
}
```
