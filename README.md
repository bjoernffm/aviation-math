# Aviation Math

[![Version](https://img.shields.io/npm/v/aviation-math.svg)](https://www.npmjs.com/package/aviation-math)
[![Downloads](https://img.shields.io/npm/dm/aviation-math.svg)](https://www.npmjs.com/package/aviation-math)
[![Build Status](https://github.com/bjoernffm/aviation-math//workflows/Node.js%20CI/badge.svg)](https://github.com/bjoernffm/aviation-math//actions)
[![Maintenance](https://img.shields.io/maintenance/yes/2025.svg)](https://github.com/bjoernffm/aviation-math/graphs/commit-activity)
[![Codecov](https://codecov.io/gh/bjoernffm/aviation-math/branch/main/graph/badge.svg)](https://codecov.io/gh/bjoernffm/aviation-math)

## Installation

Aviation Math can be used in both node.js and in the browser.

Install Aviation Math using [npm](https://www.npmjs.com/package/aviation-math):

    npm install aviation-math

## Usage

### Position class

Useful container for coordinates. The constructor expects two parameters `lat` and `lon` or a string. More documentation needs to be done here.

``` javascript
const { Position } = require("aviation-math");

const pos1 = new Position(35.161372664038055, 33.267828863069205);
// pos1.toDMS() --> 35° 09′ 40.94″ N 033° 16′ 04.18″ E

const pos2 = new Position("35.161372664038055 N 33.267828863069205 E");
// pos2.toDMS() --> 35° 09′ 40.94″ N 033° 16′ 04.18″ E

const pos3 = new Position("40° 7.38' 74° 7.38'");
// pos3.toDMS() --> 40° 07′ 22.80″ N 074° 07′ 22.80″ E
```

The class offers different conversion formats like `toDMS`, `toDMSCode`,  `toDMM`,  `toDDD`. 

See http://www.c-dev.ch/2012/10/26/koordinatenformate/ for more information.

### getBearing(from: Position, to: Position): DegreesTrue

This function calculates the true bearing from one position to another one.

``` javascript
const { Position, getBearing } = require("aviation-math");

const result = getBearing(
    new Position(39.778889, -104.9825),
    new Position(43.778889, -102.9825),
);
// result = 19.787524850709246
```

### getDistance(from: Position, to: Position) : NauticalMiles

This function calculates the distance in nautical miles from one position to another one.

``` javascript
const { Position, getDistance } = require("aviation-math");

const result = getDistance(
    new Position(50.02756868784301, 8.534261553454376),
    new Position(50.04004266904205, 8.586451452554849)
);
// result = 2.149991944029959
```

### getTurnRadius(speed: Knots, bankAngle: Degrees) : NauticalMiles

This function calculates the turn radius based on the speed in knots and the bank angle.

``` javascript
const { getTurnRadius } = require("aviation-math");

const result = getTurnRadius(160, 30);
// result is close to 0.645
```

### projectBearingDistance(reference: Position, bearing: DegreesTrue, distance: NauticalMiles): Position

This function projects a new position based on a reference position and a certain bearing and distance.

``` javascript
const { Position, projectBearingDistance } = require("aviation-math");

const result = projectBearingDistance(
    new Position(52.518611, 13.408056),
    180,
    8.09935205184,
);
// result is { lat: 52.383863707381906, lon: 13.408056 }
```

### projectBearingIntersection(point1: Position, bearing1: DegreesTrue, point2: Position, bearing2: DegreesTrue): [Position, Position]

This function projects two intersections of two points and their bearings. The closer intersection is always the first item of the list.

``` javascript
const { Position, projectBearingIntersection } = require("aviation-math");

const a = projectBearingIntersection(
    new Position(39.778889, -104.9825),
    0,
    new Position(43.778889, -102.9825),
    0,
);
// result[0] is { lat: 90, lon: -90 }
```

### projectTurnPosition(reference: Position, inboundCourse: DegreesTrue, outboundCourse: DegreesTrue, radius: NauticalMiles, turnDirection: TurnDirection) : Position

This function projects a position based on a reference position (, its inbound course) and a turn radius to an outbound course.

``` javascript
const { projectTurnPosition } = require("aviation-math");

const result = projectTurnPosition(
    new Position(50.0379326, 8.5599631),
    270,
    90,
    4,
    "LEFT"
);
// result is { lat: 49.90483820750475, lon: 8.5599631 }
```